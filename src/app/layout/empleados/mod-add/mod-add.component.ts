import { Component, OnInit, Output, Input, EventEmitter, trigger, transition, style, animate } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {EmpleadosService} from 'app/services/empleados.service';
import {Empleado} from 'app/models/empleado';
import {Medico} from 'app/models/medico';
import {Usuario} from 'app/models/usuario';
import {PaisesService} from 'app/services/paises.service';
import { Rol } from "app/models/rol";
import { Especialidad } from "app/models/especialidad";
import { Jornada } from "app/models/jornada";
import { Turno } from "app/models/turno";
import { Dia } from "app/models/dia";
@Component({
  selector: 'app-mod-add',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        // transition(':leave', [
        //   style({transform: 'translateX(0)', opacity: 1}),
        //   animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        // ])
      ]
    )
  ],
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
  providers: [EmpleadosService,NgbModal,PaisesService]
})
export class ModAddComponent implements OnInit {

 @Input() public medicos: Array<Medico>;//<--- todas las enfermedades
 @Input() public especialidades: Array<Especialidad>;
 @Input() public roles: Array<Rol>;
 @Input() public usuarios: Array<Usuario>;
 @Input() public empleados: Array<Empleado>;
 @Input() public jornada: Array<Jornada>;
 @Input() public turno:Array<Turno>;
 @Input() public dia:Array<Dia>;

  //todos los paises
  @Input() public paises: Array<any>;
  //todas las regiones de los paises
  public regiones:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  //todas las ciudades de las regiones
  public ciudades:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  public selectedCountry:any;
  public selectedRegion:any;
  public selectedCity:any;
  public estaCasada:boolean;

  public empleado: Empleado ;//<--el nuevo empleado a registrar
  public esMedico: boolean=false;
  public exito: boolean;
  public mensaje: string;
  public paso1:boolean=true;
  public paso2:boolean=false;

  closeResult: string;
  constructor(private modalService: NgbModal, private paisesService:PaisesService, private empleadosService: EmpleadosService) {}

  ngOnInit() {
    this.empleado= new Empleado ("","", "", "", "", "", "", "", "", "", "", "", "",
      new Usuario("", "", true, new Rol("", "", 0), 0),
      null,0);

  }
   open(content) {
        this.modalService.open(content,{size:'lg'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.clear();
            

        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.clear();
        });
    }

       private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
    onChangePais(){
      //obtenemos todos las regiones
      this.paisesService.listRegions(this.selectedCountry.code)
      .map((regions: Array<any>)=>{
        return regions;
      })
      .subscribe( res => this.regiones=res);

      this.ciudades= new Array<any>();

      console.log(this.selectedCountry.name);
      this.empleado.pais=this.selectedCountry.name;
    }
onChangeRegion(){
      //obtenemos todos las ciudades
      this.paisesService.listCities(this.selectedCountry.code,this.selectedRegion.region)
      .map((cities: Array<any>)=>{
        return cities;
      })
      .subscribe( res => this.ciudades=res);

      console.log(this.selectedRegion.region);
      this.empleado.division=this.selectedRegion.region;
    }
onChangeCiudad(){
      console.log(this.selectedCity.city);
      this.empleado.subdivision=this.selectedCity.city;
    }
onChangeMedico(){
  if (this.empleado.usuario.rol.nombre.toLocaleLowerCase()=='Medico'.toLocaleLowerCase()){
    this.empleado.medico=new Medico(new Array<Especialidad>(),new Array <Jornada>(),"",0)
    this.esMedico=true;
  }
  else{
    this.esMedico=false;
    this.empleado.medico=null;
  }
}
onChangeGenero(){
  if(this.empleado.genero=="M")
  this.estaCasada=false;
  this.empleado.apellido_casada="";
}
onSubmit(){
  this.empleadosService.add(this.empleado.clone()).subscribe(
    response=>{
      console.log(response);
      if(response.status == "exito"){
        this.empleado.id=response.idemp;
        this.empleado.usuario.id=response.iduser;
        this.empleado.usuario.password=response.password;
        this.empleado.usuario.username=response.user;
        this.empleados.push(this.empleado.clone());
        this.exito=true;
        this.mensaje=response.mensaje;
      }else{
        this.exito=false;
        this.mensaje=response.mensaje;
      }
      },
error=>{
  if(error!=null){
    console.log("Error al enviar la peticion: "+error);
  }
}
  );
}

    switchPaso(paso:number){
      switch(paso){
        case 1:
          this.paso1=true;
          this.paso2=false;
        break;
        case 2:
          this.paso1=false;
          this.paso2=true;
        break;
        
      }
    }

clear(){
              this.empleado.dui="";
              this.empleado.nombre1="";
              this.empleado.nombre2="";
              this.empleado.apellido1="";
              this.empleado.apellido2="";
              this.empleado.apellido_casada="";
              this.empleado.pais="";
              this.empleado.division="";
              this.empleado.subdivision="";
              this.empleado.tel_fijo="";
              this.empleado.tel_movil="";
              this.empleado.email="";
              this.empleado.usuario=new Usuario("","",true,new Rol("","",null));
               /*Habra q consultar los roles*/
              this.empleado.id=null;
              this.exito=null;
              this.selectedCountry=null;
              this.selectedRegion=null;
              this.selectedCity=null;

}


}
