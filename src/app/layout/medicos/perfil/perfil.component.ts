import { Component, OnInit, Input, EventEmitter, trigger, transition, style, animate } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Empleado } from "app/models/empleado";
import { EmpleadosService } from "app/services/empleados.service";
import { Usuario } from "app/models/usuario"
import { Medico } from "app/models/medico"
import { PaisesService } from "app/services/paises.service";
import { RolesService } from "app/services/roles.service"
import { Rol } from "app/models/rol";
import { Especialidad } from "app/models/especialidad";
import { Jornada } from "app/models/jornada";
import { Turno } from "app/models/turno";
import { Dia } from "app/models/dia";

@Component({
  selector: 'app-perfil',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        // transition(':leave', [
        //   style({transform: 'translateX(0)', opacity: 1}),
        //   animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        // ])
      ]
    )
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [EmpleadosService, PaisesService, NgbModal, RolesService]
})
export class PerfilComponent implements OnInit {
  @Input() public especialidades: Array<Especialidad>;
  @Input() public paises: Array<any>;//<--- todos los paises 
  @Input() public empleados: Array<Empleado>;
  @Input() public empleado_original: Empleado;
  @Input() public medico: Medico;
  @Input() public roles: Array<Rol>;

  empleado_modificado: Empleado;


  //public jornadas: Array<Jornada>=[];
  //todas las regiones de los paises
  public regionesEmpleado: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  //todas las ciudades de las regiones
  public ciudadesEmpleado: Array<any> = new Array<any>();//<--sera pasado al componente add y edit

  public selectedCountryEmpleado: any;
  public selectedRegionEmpleado: any;
  public selectedCityEmpleado: any;
  public estaCasada: boolean = false;
  public esMedico: boolean = false;
  public paso1: boolean = true;
  public paso2: boolean = false;
  public exito: boolean;
  public mensaje: string;
 public maskPhone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskNames = [/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,];

  closeResult: string;
  constructor(private modalService: NgbModal, private paisesService: PaisesService, private empleadosService: EmpleadosService, private rolesService: RolesService) { }

  ngOnInit() {
    /*this.empleado_modificado = this.empleado_original.clone();*/
    this.empleado_modificado= new Empleado("","","","","","","","","","","", new Usuario("", "", true, new Rol("", "", 0), 0),
     new Medico(new Array<Especialidad>(),new Array <Jornada>(),"",0),0);
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //let espe=this.empleado_original.medico.especialidad;
      this.empleado_modificado = new Empleado("","","","","","","","","","","", new Usuario("", "", true, new Rol("", "", 0), 0),
     new Medico(new Array<Especialidad>(),new Array <Jornada>(),"",0),0);
      //prueba
      //this.empleado_modificado.medico.especialidad=espe;    
      this.exito = null;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.empleado_modificado = new Empleado("","","","","","","","","","","", new Usuario("", "", true, new Rol("", "", 0), 0),
     new Medico(new Array<Especialidad>(),new Array <Jornada>(),"",0),0);
      this.exito = null;
    });
    console.log(JSON.stringify(this.empleado_modificado));
    
    this.rellenarPais();
    this.seleccionarRol();
    setTimeout(() => {
      if (this.empleado_modificado.usuario.rol.nombre == "Medico") {
        this.cargarDatosMedico();
      }
    }, 500);
  }

  // onChangeMedico(){
  //   if (this.empleado_modificado.usuario.rol.nombre.toLocaleLowerCase()=='Medico'.toLocaleLowerCase()){
  //     this.empleado_modificado.medico=new Medico(new Array<Especialidad>(),new Array <Jornada>(),"",0)
  //     this.esMedico_modificado=true;
  //   }
  //   else{
  //     this.esMedico=false;
  //     this.empleado_modificado.medico=null;
  //   }
  // }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onChangePaisEmpleado() {
    //obtenemos todos las regiones
    this.paisesService.listRegions2(this.selectedCountryEmpleado)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesEmpleado = res);

    this.ciudadesEmpleado = new Array<any>();

    console.log(this.selectedCountryEmpleado.nombrePais);
  }

  onChangeRegionEmpleado() {
    //obtenemos todos las ciudades
    this.paisesService.listCities2(this.selectedRegionEmpleado)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesEmpleado = res);

    console.log(this.selectedRegionEmpleado.nombreDivision);
  }

  onChangeCiudadEmpleado() {
    this.empleado_modificado.subdivision = this.selectedCityEmpleado;
    console.log(this.empleado_modificado.subdivision.nombreSubdivision);
  } onChangeCasada() {
    if (!this.estaCasada) {
      this.empleado_modificado.apellido_casada = "";
    }
  }

  onChangeGenero() {
    if (this.empleado_modificado.genero == "M") {
      this.estaCasada = false;
      this.empleado_modificado.apellido_casada = "";
    }
  }
  onChangeMedico() {
    if (this.empleado_modificado.usuario.rol.nombre.toLocaleLowerCase() == 'Medico'.toLocaleLowerCase()) {
      this.empleado_modificado.medico = new Medico(new Array<Especialidad>(), new Array<Jornada>(), "", 0)
      this.esMedico = true;
    }
    else {
      this.esMedico = false;
      this.empleado_modificado.medico = null;
    }
  }
  switchPaso(paso: number) {
    switch (paso) {
      case 1:
        this.paso1 = true;
        this.paso2 = false;
        break;
      case 2:
        this.paso1 = false;
        this.paso2 = true;
        break;

    }
  }

  onSubmit() {
    console.log(JSON.stringify(this.empleado_modificado));
    this.empleadosService.edit(this.empleado_modificado.clone()).subscribe(
      response => {
        console.log(response);
        if (response.status == "exito") {
          /*this.empleado_original = this.empleado_modificado;
          this.empleado_modificado = this.empleado_original.clone();*/

          let pos = this.empleados.indexOf(this.empleado_original);
          this.empleados[pos] = this.empleado_modificado.clone();
          //this.empleados[pos].usuario=this.empleado_modificado.usuario;
          //this.empleados[pos].medico=this.empleado_modificado.medico;
          //this.empleados[pos].pais=this.empleado_modificado.pais;
          this.empleado_original = this.empleados[pos];
          this.exito = true;
          this.mensaje = response.mensaje;

        } else {
          this.exito = false;
          this.mensaje = response.mensaje;

        }
      },
      error => {
        if (error != null) {
          console.log("Error al enviar la peticion: " + error);
        }
      }
    );
  }

  private rellenarPais() {

    // paises
    this.paises.forEach((pais) => {
      if (this.empleado_modificado.subdivision.idDivision.idPais.idPais == pais.idPais) {
        this.selectedCountryEmpleado = pais;
        this.onChangePaisEmpleado();
      }
    });

    setTimeout(() => {
      this.regionesEmpleado.forEach((region) => {
        if (this.empleado_modificado.subdivision.idDivision.idDivision == region.idDivision) {
          this.selectedRegionEmpleado = region;
          this.onChangeRegionEmpleado();
        }
      });
      console.log(JSON.stringify(this.regionesEmpleado));

      setTimeout(() => {
        this.ciudadesEmpleado.forEach((ciudad) => {
          if (this.empleado_modificado.subdivision.idSubdivision == ciudad.idSubdivision) {
            this.selectedCityEmpleado = ciudad;
            this.onChangeCiudadEmpleado();
          }
        });
      }, 500);
    }, 500);

  }
  private seleccionarRol() {

    this.rolesService.getUsuarioRol(this.empleado_modificado.usuario).subscribe(
      response => {
        console.log(JSON.stringify(response));
        let result: Rol = new Rol(response.idRol.nombreRol, response.idRol.descripcionRol, response.idRol.idRol);
        this.roles.forEach((rol) => {
          if (this.rolesIguales(result, rol)) {
            this.empleado_modificado.usuario.rol = rol;
          }
        });
      },
      error => {
        if (error != null) {
          console.log("Error al enviar la peticion: " + error);
        }
      }
    );
  }


  private rolesIguales(rol1: Rol, rol2: Rol): boolean {
    let returning = false;
    if (rol1.id == rol2.id) {
      returning = true;

    }
    return returning;

  }


  private especialidadesIguales(esp1: Especialidad, esp2: any): boolean {
    let returning = false;
    if (esp1.id == esp2.idEspecialidad) {
      returning = true;
      console.log("son iguales");
    } else {
      console.log("no son iguales ;(");
    }
    return returning;
  }

  private cargarDatosMedico() {
    this.empleado_modificado.medico = new Medico(new Array<Especialidad>(), new Array<Jornada>(), "", 0);
    this.esMedico = true;

    // cargamos las especialidades del medico
    this.empleadosService.getEspecialidadesEmpleado(this.empleado_modificado).subscribe(
      (erecibidas) => {
        console.log(JSON.stringify(erecibidas));
        this.especialidades.forEach((especialidad) => {
          erecibidas.idEspecialidad.forEach((erecibida) => {
            if (this.especialidadesIguales(especialidad, erecibida)) {
              this.empleado_modificado.medico.especialidades.push(especialidad);
            }
          });
        });
      },
      error => {
        if (error != null) {
          console.log("Error al enviar la peticion: " + error);
        }
      }
    );


    // obtenemos las jornadas NO PODEMOS OBTENER LOS TURNOS PORQ EL SUSODICHO LLAMADO FER; YA SE FUE A DORMIR Y NOS DEJÖ VALIENDO CON EL ENVIO DE ESOS DATOS ;(
    this.empleadosService.getJornadasEmpleado(this.empleado_modificado)
    .map((jornadas: Array<any>)=>{
        let result: Array<Jornada> = new Array<Jornada>();
         if(jornadas){
           console.log(JSON.stringify(jornadas));
             jornadas.forEach((jornada)=>{
                
                let j=new Jornada(new Dia(jornada.numeroDia,jornada.nombreDia,jornada.idDia),new Array<Turno>(),jornada.idJornada);
                //let j=new Jornada(new Dia(jornada.idDia.numeroDia,jornada.idDia.nombreDia,jornada.idDia.idDia),new Array<Turno>(),jornada.idJornada);
                //let j=new Jornada(null,new Array<Turno>(),jornada.idJornada);
                
                if(jornada.turnos==null){
                  jornada.turnos=[];
                }

                jornada.turnos.forEach((turno)=>{
                  j.turnos.push(
                    new Turno({"hour":turno.horaInicio,"minute":turno.minutoIncio,"second":0},{"hour":turno.horaFin,"minute":turno.minutoFin,"second":0},turno.idTurno)
                  )
                });

                result.push(j);

             });
         }
         return result;
     })
     .subscribe( res => this.empleado_modificado.medico.jornadas = res);


     let dias = [
        new Dia(1, 'Lunes', null),
        new Dia(2, 'Martes', null),
        new Dia(3, 'Miercoles', null),
        new Dia(4, 'Jueves', null),
        new Dia(5, 'Viernes', null),
        new Dia(6, 'Sabado', null),
        new Dia(7, 'Domingo', null),
      ];

      //estas deben ser consultadas en el edit borrar esto 
      // dias.forEach((dia)=>{
      //   this.empleado_modificado.medico.jornadas.push(
      //     new Jornada(dia,[],null)
      //   );
      // });

      // this.empleado_modificado.medico.jornadas[0].turnos.push(new Turno({"hour":5,"minute":5,"second":5},{"hour":7,"minute":7,"second":7},1));
      // this.empleado_modificado.medico.jornadas[2].turnos.push(new Turno({"hour":1,"minute":1,"second":1},{"hour":7,"minute":7,"second":7},1));
      // this.empleado_modificado.medico.jornadas[4].turnos.push(new Turno({"hour":2,"minute":2,"second":2},{"hour":7,"minute":7,"second":7},1));
      // this.empleado_modificado.medico.jornadas[6].turnos.push(new Turno({"hour":3,"minute":3,"second":3},{"hour":7,"minute":7,"second":7},1));

  }


  addTurno(jornada: Jornada, c: any) {

    if (c.checked && jornada.turnos.length == 0) {
      jornada.turnos.push(
        new Turno(null, null, null)
      );
      console.log(JSON.stringify(this.empleado_modificado.medico.jornadas));
    } else {
      jornada.turnos.splice(0, 1);
    }

  }




}
