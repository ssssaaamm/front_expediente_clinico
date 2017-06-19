import { Component, OnInit, Output, Input, EventEmitter, trigger, transition, style, animate } from '@angular/core';
import { PacientesService } from "app/services/pacientes.service";
import { PaisesService } from "app/services/paises.service";
import { EnfermedadesService } from "app/services/enfermedades.service";
import { Enfermedad } from "app/models/enfermedad";
import { Paciente } from "app/models/paciente";
import { Responsable } from "app/models/responsable";
import { Padre } from "app/models/padre";
import { Usuario } from "app/models/usuario";

@Component({
  selector: 'app-mod-datos',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
      ]
    )
  ],
  templateUrl: './mod-datos.component.html',
  styleUrls: ['./mod-datos.component.scss'],
  providers: [PacientesService, PaisesService, EnfermedadesService]
})
export class ModDatosComponent implements OnInit {

  public enfermedades: Array<Enfermedad>=new Array<Enfermedad>();//<--- todas las enfermedade
  public paises: Array<any>=new Array<any>();//<--- todos los paises
  public paciente_original: Paciente=new Paciente('','','','','','',null,null,null,'M','','','','',null,new Responsable('','','','','','','','','',null),new Padre('','','','','','','M','',new Array<Enfermedad>()),new Padre('','','','','','','F','',new Array<Enfermedad>()),new Array<Enfermedad>(),new Usuario('','',true,null),null);
; //<--- paciente original.
  public paciente_modificado: Paciente=new Paciente('','','','','','',null,null,null,'M','','','','',null,new Responsable('','','','','','','','','',null),new Padre('','','','','','','M','',new Array<Enfermedad>()),new Padre('','','','','','','F','',new Array<Enfermedad>()),new Array<Enfermedad>(),new Usuario('','',true,null),null); //<--- paciente original.

  //todas las regiones de los paises
  public regionesPadre: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  public regionesMadre: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  public regionesResponsable: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  public regionesPaciente: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  //todas las ciudades de las regiones
  public ciudadesPadre: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  public ciudadesMadre: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  public ciudadesResponsable: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  public ciudadesPaciente: Array<any> = new Array<any>();//<--sera pasado al componente add y edit

  public selectedCountryPadre: any;
  public selectedRegionPadre: any;
  public selectedCityPadre: any;
  public selectedCountryMadre: any;
  public selectedRegionMadre: any;
  public selectedCityMadre: any;
  public selectedCountryPaciente: any;
  public selectedRegionPaciente: any;
  public selectedCityPaciente: any;
  public selectedCountryResponsable: any;
  public selectedRegionResponsable: any;
  public selectedCityResponsable: any;
  public estaCasada:boolean=false;
  public estaCasadaMadre:boolean=false;
  public estaCasadaResponsable:boolean=false;
  
  public fecha_nacimiento: any;


  public paso1: boolean = true;
  public paso2: boolean = false;
  public paso3: boolean = false;

  public exito: boolean;
  public mensaje: string;
  public maskPhone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskNames = [/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,];


  closeResult: string;

  constructor(private paisesService: PaisesService, private pacientesService: PacientesService, private enfermedadesService: EnfermedadesService) { }

  ngOnInit() {
    //obtenemos las enfermedades el paciente a editar en este modal y su padre y madre pero esto se haria al abrir el modal
    //this.paciente_modificado = this.paciente_original.clone();
    //console.log(">>>>>>>>>>>>>>>>"+JSON.stringify(this.paciente_modificado.id));
    this.obtenerPaises();
    this.obtenerEnfermedades();
    this.obtenerPaciente();
    //this.rellenarPaises();
    //this.rellenarFechaNacimiento();
    //this.rellenarApellidosCasada();
    //this.rellenarEnfermedades();    
  }

  obtenerPaises(){
    //obtenemos todos los paises
    this.paisesService.listCountries2()
      .map((paises: Array<any>) => {
        return paises;
      })
      .subscribe(res => this.paises = res);
  }

  obtenerEnfermedades(){

    //obtenemos todas las enfermedades
    this.enfermedadesService.list()
      .map((enfermedades: Array<any>) => {
        let result: Array<Enfermedad> = new Array<Enfermedad>();
        if (enfermedades) {
          enfermedades.forEach((enfermedad) => {
            result.push(new Enfermedad(enfermedad.codigoEnfermedad, enfermedad.nombreEnfermedad, enfermedad.idEnfermedad));
          });
        }
        return result;
      })
      .subscribe(res => this.enfermedades = res);
  }

  obtenerPaciente(){
        //obtenemos el  paciente

    let identidad = JSON.parse(localStorage.getItem("identity"));
    console.log("ENVIANDO IDENTIDAD: " + JSON.stringify(identidad));
    this.pacientesService.datos(identidad)
      .map((paciente: any) => {
        let result: Paciente ;
            // console.log("INICIO PACIENTE");
            // console.log(JSON.stringify(paciente));
            // console.log("FIN PACIENTE");
            let father:Padre;
            let mother:Padre;
            paciente.idPadre.forEach((p)=>{
              let f =new Padre(
                p.nombre1,
                p.nombre2,
                p.apellido1,
                p.apellido2,
                p.apellidoCasada,
                p.documentoUnico,
                p.genero,
                p.idSubdivision,
                new Array<Enfermedad>(),//<----- lista de enfermedades. no se si vendran incluidas debo consultar las enfermedades del padre :( despues
                p.idPadre
              );

              // console.log("PADREEEE "+JSON.stringify(p));

              if(f.genero=='F'){
                mother=f;
              }else{
                father=f;
              }
            });
            //let tipindx:number = this.indexOfEspecialidad(new Especialidad(cirugia.idEspecialidad.codigoEspecialidad,cirugia.idEspecialidad.nombreEspecialidad,cirugia.idEspecialidad.idEspecialidad),this.especialidades);
            result=new Paciente(
              paciente.nombre1,
              paciente.nombre2,
              paciente.apellido1,
              paciente.apellido2,
              paciente.apellidoCasada,
              paciente.documentoUnico,
              paciente.diaNacimientoPaciente,
              paciente.mesNacimientoPaciente,
              paciente.anioNacimientoPaciente,
              paciente.genero,
              paciente.idSubdivision,
              paciente.telFijo,
              paciente.telMovil,
              paciente.email,
              // new Expediente(
              //   paciente.idExpediente.diaAperturaExpediente,
              //   paciente.idExpediente.mesAperturaExpediente,
              //   paciente.idExpediente.anioAperturaExpediente,
              //   paciente.idExpediente.diaExpiracionExpediente,
              //   paciente.idExpediente.mesExpiracionExpediente,
              //   paciente.idExpediente.anioExpiracionExpediente,
              //   paciente.idExpediente.numeroExpediente,
              //   //agregar estado expediente
              //   null,//<--rompo la referencia circular (aqui va el paciente actual).
              //   paciente.idExpediente.idExpediente
              // ),
              null,//<------expediente en null en un principio
              new Responsable(
                paciente.idResponsable.nombre1,
                paciente.idResponsable.nombre2,
                paciente.idResponsable.apellido1,
                paciente.idResponsable.apellido2,
                paciente.idResponsable.genero,
                paciente.idResponsable.apellidoCasada,
                paciente.idResponsable.documentoUnico,
                paciente.idResponsable.idSubdivision,
                paciente.idResponsable.telFijo,
                paciente.idResponsable.telMovil,
                paciente.idResponsable.idResponsable
              ),
              father,
              mother,
              new Array<Enfermedad>(),//<----- lista de enfermedades. no se si vendran incluidas debo consultar las enfermedades del paciente despues :(
              new Usuario(
                paciente.idUsuario.username, paciente.idUsuario.password, paciente.idUsuario.estado,null, paciente.idUsuario.idUsuario //<--no me interesa su rol
              ),
              //null,//<------- Este es el usuario actual
              paciente.idPaciente
            );
        
        return result;
      })
      .subscribe(res => { 
        this.paciente_modificado = res;
        //this.paciente_modificado = this.paciente_original.clone(); 
        console.log(JSON.stringify(this.paciente_modificado));
        this.rellenarFechaNacimiento();
        this.rellenarApellidosCasada();
        this.rellenarPaises();
        this.rellenarEnfermedades();
      });
  }

  rellenarApellidosCasada(){

    //paciente
    if(this.paciente_modificado.apellido_casada == null || this.paciente_modificado.apellido_casada == ''){
      this.estaCasada=false;
    }else{
      this.estaCasada=true;
    }
    
    //madre
    if(this.paciente_modificado.madre.apellido_casada == null || this.paciente_modificado.madre.apellido_casada == ''){
      this.estaCasadaMadre=false;
    }else{
      this.estaCasadaMadre=true;
    }

    //responsable
    if(this.paciente_modificado.responsable.apellido_casada == null || this.paciente_modificado.responsable.apellido_casada == ''){
      this.estaCasadaResponsable=false;
    }else{
      this.estaCasadaResponsable=true;
    }
  }

onChangePaisPadre() {
    //obtenemos todos las regiones
    this.paisesService.listRegions2(this.selectedCountryPadre)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesPadre = res);

    this.ciudadesPadre = new Array<any>();

    console.log(this.selectedCountryPadre.nombrePais);
  }

  onChangeRegionPadre() {
    //obtenemos todos las ciudades
    this.paisesService.listCities2(this.selectedRegionPadre)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesPadre = res);

    console.log(this.selectedRegionPadre.nombreDivision);
  }

  onChangeCiudadPadre() {
    this.paciente_modificado.padre.subdivision = this.selectedCityPadre;
    console.log(this.paciente_modificado.padre.subdivision.nombreSubdivision);
  }

  onChangePaisMadre() {
    //obtenemos todos las regiones
    this.paisesService.listRegions2(this.selectedCountryMadre)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesMadre = res);

    this.ciudadesMadre = new Array<any>();

    console.log(this.selectedCountryMadre.nombrePais);
  }

  onChangeRegionMadre() {
    //obtenemos todos las ciudades
    this.paisesService.listCities2(this.selectedRegionMadre)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesMadre = res);

    console.log(this.selectedRegionMadre.nombreDivision);
  }

  onChangeCiudadMadre() {
    this.paciente_modificado.madre.subdivision = this.selectedCityMadre;
    console.log(this.paciente_modificado.madre.subdivision.nombreSubdivision);
  } 

  //PACIENTES
onChangePaisPaciente() {
    //obtenemos todos las regiones
    this.paisesService.listRegions2(this.selectedCountryPaciente)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesPaciente = res);

    this.ciudadesPaciente = new Array<any>();

    console.log(this.selectedCountryPaciente.nombrePais);
  }

  onChangeRegionPaciente() {
    //obtenemos todos las ciudades
    this.paisesService.listCities2(this.selectedRegionPaciente)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesPaciente = res);

    console.log(this.selectedRegionPaciente.nombreDivision);
  }

  onChangeCiudadPaciente() {
    this.paciente_modificado.subdivision = this.selectedCityPaciente;
    console.log(this.paciente_modificado.subdivision.nombreSubdivision);
  } 


onChangePaisResponsable() {
    //obtenemos todos las regiones
    this.paisesService.listRegions2(this.selectedCountryResponsable)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesResponsable = res);

    this.ciudadesResponsable = new Array<any>();

    console.log(this.selectedCountryResponsable.nombrePais);
  }

  onChangeRegionResponsable() {
    //obtenemos todos las ciudades
    this.paisesService.listCities2(this.selectedRegionResponsable)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesResponsable = res);

    console.log(this.selectedRegionResponsable.nombreDivision);
  }

  onChangeCiudadResponsable() {
    this.paciente_modificado.responsable.subdivision = this.selectedCityResponsable;
    console.log(this.paciente_modificado.responsable.subdivision.nombreSubdivision);
  } 

  onChangeCasada() {
    if (!this.estaCasada) {
      this.paciente_modificado.apellido_casada = "";
    }
  }

  onChangeGenero() {
    if (this.paciente_modificado.genero == "M") {
      this.estaCasada = false;
      this.paciente_modificado.apellido_casada = "";
    }
  }
  onChangeCasadaMadre(){
      if(!this.estaCasada){
        this.paciente_modificado.madre.apellido_casada="";
      }
    }
  
  onChangeCasadaResponsable(){
      if(!this.estaCasada){
        this.paciente_modificado.responsable.apellido_casada="";
      }
    }

  onChangeGeneroResponsable(){
      if(this.paciente_modificado.responsable.genero=="M"){
        this.estaCasada=false;
        this.paciente_modificado.responsable.apellido_casada="";
      }
    }


  switchPaso(paso: number) {
    switch (paso) {
      case 1:
        this.paso1 = true;
        this.paso2 = false;
        this.paso3 = false;
        break;
      case 2:
        this.paso1 = false;
        this.paso2 = true;
        this.paso3 = false;
        break;
      default:
        this.paso1 = false;
        this.paso2 = false;
        this.paso3 = true;
        break;
    }
  }

  onSubmit() {
    this.pacientesService.edit(this.paciente_modificado.clone()).subscribe(
      response => {
        console.log("RESPUESTA RECIBIDA>>>>"+response);
        if (response.status == "exito") {
          //let pos = this.pacientes.indexOf(this.paciente_original);

          // 1) Id del padre creado
          // 2) Id de la madre creada
          // 3) Id del responsable creado
          // 4) id del expediente creado
          // 5) numero del expediente creado
          // 6) Id del usuario creado
          // 7) Username del usuario 
          // 8) Password

          // this.paciente_modificado.padre.id = response.idpadre;
          // this.paciente_modificado.madre.id = response.idmadre;
          // this.paciente_modificado.responsable.id = response.idresponsable;
          // this.paciente_modificado.expediente.id = response.idexpediente;
          // this.paciente_modificado.expediente.numero_expediente = response.nexpediente;
          // this.paciente_modificado.usuario.id = response.idusuario;
          // this.paciente_modificado.usuario.id = response.username;
          // this.paciente_modificado.usuario.password = response.password;

          //this.pacientes[pos] = this.paciente_modificado.clone();
          //this.paciente_original = this.paciente_modificado.clone();
          this.exito = true;
          this.mensaje = response.mensaje;
          this.obtenerPaciente();

        } else {
          this.exito = false;
          this.mensaje = response.mensaje;
          this.obtenerPaciente();
        }
      },
      error => {
        if (error != null) {
          console.log("Error al enviar la peticion: " + error);
        }
      }
    );
  }

  private enfermedadesIguales(e1: Enfermedad, e2: any): boolean {
    let returning = false;
    if (e1.id == e2.idEnfermedad) {
      returning = true;
      console.log("son iguales");
    } else {
      console.log("no son iguales ;(");
    }
    return returning;
  }

  private rellenarEnfermedades() {

    //rellenar padecimientos paciente
    this.enfermedadesService.getPadecimientosPaciente({"id":this.paciente_modificado.usuario.id}).subscribe(
      (erecibidas) => {
        this.enfermedades.forEach((enfermedad) => {
          erecibidas.idEnfermedad.forEach((erecibida) => {
            if (this.enfermedadesIguales(enfermedad, erecibida)) {
              this.paciente_modificado.enfermedades.push(enfermedad);
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

    //rellenar padecimientos padre
    this.enfermedadesService.getPadecimientosPadre({"id":this.paciente_modificado.padre.id}).subscribe(
      (erecibidas) => {
        this.enfermedades.forEach((enfermedad) => {
          erecibidas.idEnfermedad.forEach((erecibida) => {
            if (this.enfermedadesIguales(enfermedad, erecibida)) {
              this.paciente_modificado.padre.enfermedades.push(enfermedad);
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

    //rellenar padecimientos padre
    this.enfermedadesService.getPadecimientosPadre({"id":this.paciente_modificado.madre.id}).subscribe(
      (erecibidas) => {
        this.enfermedades.forEach((enfermedad) => {
          erecibidas.idEnfermedad.forEach((erecibida) => {
            if (this.enfermedadesIguales(enfermedad, erecibida)) {
              this.paciente_modificado.madre.enfermedades.push(enfermedad);
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

    // //consultar padecimientos de paciente
    // let epaciente = [];
    // //console.log("EL ID DEL PACIENTE ES: "+this.paciente_modificado.id)
    // this.enfermedadesService.getPadecimientosPaciente({"id":this.paciente_modificado.usuario.id})
    //   .map((response: any) => {
    //     let enfermedades = response.idEnfermedad;
    //     let result: Array<Enfermedad> = new Array<Enfermedad>();
    //     if (enfermedades) {
    //     console.log("ENFERMEDADE jalasdas>>>>"+JSON.stringify(enfermedades));
    //       enfermedades.forEach((enfermedad) => {
    //         result.push(new Enfermedad(enfermedad.codigoEnfermedad, enfermedad.nombreEnfermedad, enfermedad.idEnfermedad));
    //       });
    //     }
    //     return result;
    //   })
    //   .subscribe(res => epaciente = res);
    //   console.log("ENFERMEDADE DEL PACIENTE SON>>>>"+JSON.stringify(epaciente));

    //llenado de prueba
    // epaciente = [
    //   new Enfermedad('01', 'Evola', 1),
    //   new Enfermedad('02', 'Rubiola', 2),
    //   new Enfermedad('04', 'Varicela', 4),
    //   new Enfermedad('05', 'Ramon', 5),
    // ];

    //seleccionamos los padecimientos del paciente
    // this.paciente_modificado.enfermedades = new Array<Enfermedad>();
    // epaciente.forEach((e) => {
    //   let matched = this.matchEnfermedad(e.id);
    //   if (matched != null) {
    //     this.paciente_modificado.enfermedades.push(matched);
    //   }
    // });



    //consultar padecimientos de padre
    // let epadre = [];
    // this.enfermedadesService.getPadecimientosPadre({"id":this.paciente_modificado.padre.id})
    //   .map((response: any) => {
    //     let enfermedades = response.idEnfermedad;
    //     let result: Array<Enfermedad> = new Array<Enfermedad>();
    //     if (enfermedades) {
    //       enfermedades.forEach((enfermedad) => {
    //         result.push(new Enfermedad(enfermedad.codigoEnfermedad, enfermedad.nombreEnfermedad, enfermedad.idEnfermedad));
    //       });
    //     }
    //     return result;
    //   })
    //   .subscribe(res => epadre = res);

    //llenado de prueba
    // epadre = [
    //   new Enfermedad('01', 'Evola', 1),
    //   new Enfermedad('02', 'Rubiola', 2),
    // ];

    //seleccionamos los padecimientos del padre
    // this.paciente_modificado.padre.enfermedades = new Array<Enfermedad>();
    // epadre.forEach((e) => {
    //   let matched = this.matchEnfermedad(e.id);
    //   if (matched != null) {
    //     this.paciente_modificado.padre.enfermedades.push(matched);
    //   }
    // });



    //consultar padecimientos de madre
    // let emadre = [];
    // this.enfermedadesService.getPadecimientosPadre({"id":this.paciente_modificado.madre.id})
    //   .map((response: any) => {
    //     let enfermedades = response.idEnfermedad;
    //     let result: Array<Enfermedad> = new Array<Enfermedad>();
    //     if (enfermedades) {
    //       enfermedades.forEach((enfermedad) => {
    //         result.push(new Enfermedad(enfermedad.codigoEnfermedad, enfermedad.nombreEnfermedad, enfermedad.idEnfermedad));
    //       });
    //     }
    //     return result;
    //   })
    //   .subscribe(res => emadre = res);

    //llenado de prueba
    // emadre = [
    //   new Enfermedad('01', 'Evola', 1),
    //   new Enfermedad('02', 'Rubiola', 2),
    // ];

    //seleccionamos los padecimientos del Padre
    // this.paciente_modificado.padre.enfermedades = new Array<Enfermedad>();
    // epadre.forEach((e) => {
    //   let matched = this.matchEnfermedad(e.id);
    //   if (matched != null) {
    //     this.paciente_modificado.padre.enfermedades.push(matched);
    //   }
    // });

    //seleccionamos los padecimientos del madre
    // this.paciente_modificado.madre.enfermedades = new Array<Enfermedad>();
    // emadre.forEach((e) => {
    //   let matched = this.matchEnfermedad(e.id);
    //   if (matched != null) {
    //     this.paciente_modificado.madre.enfermedades.push(matched);
    //   }
    // });

  }

  // private matchEnfermedad(id: number): Enfermedad {
  //   let returning: Enfermedad = null;
  //   this.enfermedades.forEach((enfermedad) => {
  //     if (enfermedad.id == id) {
  //       returning = enfermedad;
  //     }
  //   });
  //   return returning;

  //   //
  // }

  private rellenarPaises() {

    // pacientes
    this.paises.forEach((pais) => {
      if (this.paciente_modificado.subdivision.idDivision.idPais.idPais == pais.idPais) {
        this.selectedCountryPaciente = pais;
        this.onChangePaisPaciente();
      }
    });

    setTimeout(() => {
      this.regionesPaciente.forEach((region) => {
        if (this.paciente_modificado.subdivision.idDivision.idDivision == region.idDivision) {
          this.selectedRegionPaciente = region;
          this.onChangeRegionPaciente();
        }
      });

      setTimeout(() => {
        this.ciudadesPaciente.forEach((ciudad) => {
          if (this.paciente_modificado.subdivision.idSubdivision == ciudad.idSubdivision) {
            this.selectedCityPaciente = ciudad;
            this.onChangeCiudadPaciente();
          }
        });
      }, 800);
    }, 800);

    

  //   // padre
     
    this.paises.forEach((pais) => {
      if (this.paciente_modificado.padre.subdivision.idDivision.idPais.idPais == pais.idPais) {
        this.selectedCountryPadre = pais;
        this.onChangePaisPadre();
      }
    });

    setTimeout(() => {
      this.regionesPadre.forEach((region) => {
        if (this.paciente_modificado.padre.subdivision.idDivision.idDivision == region.idDivision) {
          this.selectedRegionPadre = region;
          this.onChangeRegionPadre();
        }
      });

      setTimeout(() => {
        this.ciudadesPadre.forEach((ciudad) => {
          if (this.paciente_modificado.padre.subdivision.idSubdivision == ciudad.idSubdivision) {
            this.selectedCityPadre = ciudad;
            this.onChangeCiudadPadre();
          }
        });
      }, 800);
    }, 800);
  


  // Madre
     
    this.paises.forEach((pais) => {
      if (this.paciente_modificado.madre.subdivision.idDivision.idPais.idPais == pais.idPais) {
        this.selectedCountryMadre = pais;
        this.onChangePaisMadre();
      }
    });

    setTimeout(() => {
      this.regionesMadre.forEach((region) => {
        if (this.paciente_modificado.madre.subdivision.idDivision.idDivision == region.idDivision) {
          this.selectedRegionMadre = region;
          this.onChangeRegionMadre();
        }
      });

      setTimeout(() => {
        this.ciudadesMadre.forEach((ciudad) => {
          if (this.paciente_modificado.madre.subdivision.idSubdivision == ciudad.idSubdivision) {
            this.selectedCityMadre = ciudad;
            this.onChangeCiudadMadre();
          }
        });
      }, 800);
    }, 800);



  // Responsables
     
    this.paises.forEach((pais) => {
      if (this.paciente_modificado.responsable.subdivision.idDivision.idPais.idPais == pais.idPais) {
        this.selectedCountryResponsable = pais;
        this.onChangePaisResponsable();
      }
    });

    setTimeout(() => {
      this.regionesResponsable.forEach((region) => {
        if (this.paciente_modificado.responsable.subdivision.idDivision.idDivision == region.idDivision) {
          this.selectedRegionResponsable = region;
          this.onChangeRegionResponsable();
        }
      });

      setTimeout(() => {
        this.ciudadesResponsable.forEach((ciudad) => {
          if (this.paciente_modificado.responsable.subdivision.idSubdivision == ciudad.idSubdivision) {
            this.selectedCityResponsable = ciudad;
            this.onChangeCiudadResponsable();
          }
        });
      }, 1500);
    }, 1500);
  }

  rellenarFechaNacimiento() {
    console.log('ENTRO CARGAR FECHAS')
    this.fecha_nacimiento={};
    this.fecha_nacimiento.year = this.paciente_modificado.anio_nacimiento;
    this.fecha_nacimiento.month = this.paciente_modificado.mes_nacimiento;
    this.fecha_nacimiento.day = this.paciente_modificado.dia_nacimiento;
  }


}
