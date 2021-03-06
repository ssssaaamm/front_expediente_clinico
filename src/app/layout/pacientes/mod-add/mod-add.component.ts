import { Component, OnInit, Output, Input, EventEmitter, trigger, transition, style, animate } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {PaisesService} from 'app/services/paises.service';
import {PacientesService} from 'app/services/pacientes.service';
import {Paciente} from 'app/models/paciente';
import {Padre} from 'app/models/padre';
import {Responsable} from 'app/models/responsable';
import {Enfermedad} from 'app/models/enfermedad';
import {Expediente} from 'app/models/expediente';
import emailMask from 'text-mask-addons/dist/emailMask';
import { Usuario } from "app/models/usuario";

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
  providers: [PacientesService,PaisesService,NgbModal]
})
export class ModAddComponent implements OnInit {


  
  @Input() public enfermedades: Array<Enfermedad>;//<--- todas las enfermedades
  @Input() public paises: Array<any>;//<--- todos los paises
  @Input() public pacientes: Array<Paciente>;//<--- todos los paises

  //todas las regiones de los paises
  public regionesPadre:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  public regionesMadre:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  public regionesResponsable:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  public regionesPaciente:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  //todas las ciudades de las regiones
  public ciudadesPadre:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  public ciudadesMadre:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  public ciudadesResponsable:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  public ciudadesPaciente:Array<any>=new Array<any>();//<--sera pasado al componente add y edit

  public selectedCountryPadre:any;
  public selectedRegionPadre:any;
  public selectedCityPadre:any;
  public selectedCountryMadre:any;
  public selectedRegionMadre:any;
  public selectedCityMadre:any;
  public selectedCountryPaciente:any;
  public selectedRegionPaciente:any;
  public selectedCityPaciente:any;
  public selectedCountryResponsable:any;
  public selectedRegionResponsable:any;
  public selectedCityResponsable:any;
  public estaCasada:boolean=false;
  public estaCasadaMadre:boolean=false;
  public estaCasadaResponsable:boolean=false;
  
  
  public fecha_nacimiento:any;
  
  public paciente: Paciente ;//<--el nuevo paciente a registrar
  
  public paso1:boolean=true;
  public paso2:boolean=false;
  public paso3:boolean=false;
  
  public exito: boolean;
  public mensaje: string;
  public maskCell = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskPhone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskNames = [/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,];

  closeResult: string;
  
  constructor(private modalService: NgbModal,private paisesService:PaisesService, private pacientesService: PacientesService) {

  }

  ngOnInit() {
    this.clearFields();
  }

  open(content) {
        this.modalService.open(content,{size:'lg'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.clearFields();
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.clearFields();
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

    /*onChangePaisPadre(){
      //obtenemos todos las regiones
      this.paisesService.listRegions(this.selectedCountryPadre.code)
      .map((regions: Array<any>)=>{
        return regions;
      })
      .subscribe( res => this.regionesPadre=res);

      this.ciudadesPadre= new Array<any>();

      console.log(this.selectedCountryPadre.name);
      this.paciente.padre.pais=this.selectedCountryPadre.name;
    }

    onChangeRegionPadre(){
      //obtenemos todos las ciudades
      this.paisesService.listCities(this.selectedCountryPadre.code,this.selectedRegionPadre.region)
      .map((cities: Array<any>)=>{
        return cities;
      })
      .subscribe( res => this.ciudadesPadre=res);

      console.log(this.selectedRegionPadre.region);
      this.paciente.padre.division=this.selectedRegionPadre.region;
    }

    onChangeCiudadPadre(){
      console.log(this.selectedCityPadre.city);
      this.paciente.padre.subdivision=this.selectedCityPadre.city;
    }
*/

   //obtenemos todos las regiones
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
    this.paciente.padre.subdivision=this.selectedCityPadre;
    console.log(this.paciente.padre.subdivision.nombreSubdivision);
  }

 //obtenemos todos las regiones de la madre
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
    this.paciente.madre.subdivision=this.selectedCityMadre;
    console.log(this.paciente.madre.subdivision.nombreSubdivision);
  }



 /*   onChangePaisMadre(){
      //obtenemos todos las regiones
      this.paisesService.listRegions(this.selectedCountryMadre.code)
      .map((regions: Array<any>)=>{
        return regions;
      })
      .subscribe( res => this.regionesMadre=res);

      this.ciudadesMadre= new Array<any>();

      console.log(this.selectedCountryMadre.name);
      this.paciente.madre.pais=this.selectedCountryMadre.name;
    }

    onChangeRegionMadre(){
      //obtenemos todos las ciudades
      this.paisesService.listCities(this.selectedCountryMadre.code,this.selectedRegionMadre.region)
      .map((cities: Array<any>)=>{
        return cities;
      })
      .subscribe( res => this.ciudadesMadre=res);

      console.log(this.selectedRegionMadre.region);
      this.paciente.madre.division=this.selectedRegionMadre.region;
    }

    onChangeCiudadMadre(){
      console.log(this.selectedCityMadre.city);
      this.paciente.madre.subdivision=this.selectedCityMadre.city;
    }
*/
/*
    onChangePaisPaciente(){
      //obtenemos todos las regiones
      this.paisesService.listRegions(this.selectedCountryPaciente.code)
      .map((regions: Array<any>)=>{
        return regions;
      })
      .subscribe( res => this.regionesPaciente=res);

      this.ciudadesPaciente= new Array<any>();

      console.log(this.selectedCountryPaciente.name);
      this.paciente.pais=this.selectedCountryPaciente.name;
    }

    onChangeRegionPaciente(){
      //obtenemos todos las ciudades
      this.paisesService.listCities(this.selectedCountryPaciente.code,this.selectedRegionPaciente.region)
      .map((cities: Array<any>)=>{
        return cities;
      })
      .subscribe( res => this.ciudadesPaciente=res);

      console.log(this.selectedRegionPaciente.region);
      this.paciente.division=this.selectedRegionPaciente.region;
    }

    onChangeCiudadPaciente(){
      console.log(this.selectedCityPaciente.city);
      this.paciente.subdivision=this.selectedCityPaciente.city;
    }

*/

 //obtenemos todos las regiones
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
    this.paciente.subdivision=this.selectedCityPaciente;
    console.log(this.paciente.subdivision.nombreSubdivision);
  }

 //obtenemos todos las regiones
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
    this.paciente.responsable.subdivision=this.selectedCityResponsable;
    console.log(this.paciente.responsable.subdivision.nombreSubdivision);
  }



    /*onChangePaisResponsable(){
      //obtenemos todos las regiones
      this.paisesService.listRegions(this.selectedCountryResponsable.code)
      .map((regions: Array<any>)=>{
        return regions;
      })
      .subscribe( res => this.regionesResponsable=res);

      this.ciudadesResponsable= new Array<any>();

      console.log(this.selectedCountryResponsable.name);
      this.paciente.responsable.pais=this.selectedCountryResponsable.name;
    }

    onChangeRegionResponsable(){
      //obtenemos todos las ciudades
      this.paisesService.listCities(this.selectedCountryResponsable.code,this.selectedRegionResponsable.region)
      .map((cities: Array<any>)=>{
        return cities;
      })
      .subscribe( res => this.ciudadesResponsable=res);

      console.log(this.selectedRegionResponsable.region);
      this.paciente.responsable.division=this.selectedRegionResponsable.region;
    }

    onChangeCiudadResponsable(){
      console.log(this.selectedCityResponsable.city);
      this.paciente.responsable.subdivision=this.selectedCityResponsable.city;
    }
*/
    onChangeCasada(){
      if(!this.estaCasada){
        this.paciente.apellido_casada="";
      }
    }

   onChangeCasadaMadre(){
      if(!this.estaCasadaMadre){
        this.paciente.madre.apellido_casada="";
      }
    }
  
  onChangeCasadaResponsable(){
      if(!this.estaCasadaResponsable){
        this.paciente.responsable.apellido_casada="";
      }
    }

    onChangeGenero(){
      if(this.paciente.genero=="M"){
        this.estaCasada=false;
        this.paciente.apellido_casada="";
      }
    }

   onChangeGeneroResponsable(){
      if(this.paciente.responsable.genero=="M"){
        this.estaCasada=false;
        this.paciente.responsable.apellido_casada="";
      }
    }

    switchPaso(paso:number){
      switch(paso){
        case 1:
          this.paso1=true;
          this.paso2=false;
          this.paso3=false;
        break;
        case 2:
          this.paso1=false;
          this.paso2=true;
          this.paso3=false;
        break;
        default:
          this.paso1=false;
          this.paso2=false;
          this.paso3=true;
        break;
      }
    }

    private clearFields(){
      this.paciente=new Paciente('','','','','','',null,null,null,'M','','','','',null,new Responsable('','','','','','','','','',null),new Padre('','','','','','','M','',new Array<Enfermedad>()),new Padre('','','','','','','F','',new Array<Enfermedad>()),new Array<Enfermedad>(),new Usuario('','',true,null),null);
      this.selectedCountryPadre=null;
      this.selectedRegionPadre=null;
      this.selectedCityPadre=null;
      this.selectedCountryMadre=null;
      this.selectedRegionMadre=null;
      this.selectedCityMadre=null;
      this.selectedCountryPaciente=null;
      this.selectedRegionPaciente=null;
      this.selectedCityPaciente=null;
      this.selectedCountryResponsable=null;
      this.selectedRegionResponsable=null;
      this.selectedCityResponsable=null;
      //todas las regiones de los paises
      this.regionesPadre =new Array<any>();//<--sera pasado al componente add y edit
      this.regionesMadre =new Array<any>();//<--sera pasado al componente add y edit
      this.regionesResponsable =new Array<any>();//<--sera pasado al componente add y edit
      this.regionesPaciente =new Array<any>();//<--sera pasado al componente add y edit
      //todas las ciudades de las regiones
      this.ciudadesPadre =new Array<any>();//<--sera pasado al componente add y edit
      this.ciudadesMadre =new Array<any>();//<--sera pasado al componente add y edit
      this.ciudadesResponsable =new Array<any>();//<--sera pasado al componente add y edit
      this.ciudadesPaciente =new Array<any>();//<--sera pasado al componente add y edit
    }

    onSubmit(){
      //antes de enviar
      this.paciente.anio_nacimiento=this.fecha_nacimiento.year;
      this.paciente.mes_nacimiento=this.fecha_nacimiento.month;
      this.paciente.dia_nacimiento=this.fecha_nacimiento.day;
      this.pacientesService.add(this.paciente).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    this.paciente.id=response.idpaciente;
                    this.paciente.padre.id=response.idpadre;
                    this.paciente.madre.id=response.idmadre;
                    this.paciente.responsable.id=response.idresponsable;
                    this.paciente.expediente=new Expediente(null,null,null,null,null,null,response.nexpediente,this.paciente,null,response.idexpediente);
                    this.paciente.expediente.id=response.idexpediente;
                    this.paciente.expediente.numero_expediente=response.nexpediente,
                    this.paciente.usuario.id=response.idusuario;
                    this.paciente.usuario.username=response.username
                    this.paciente.usuario.password=response.password
                    this.pacientes.push(this.paciente.clone());
                    this.exito=true;
                    this.mensaje=response.mensaje;
                }else{
                    this.exito=false;
                    this.mensaje=response.mensaje;
                }
            },
            error=>{
                if(error!=null) {
                    console.log("Error al enviar la peticion: "+error);
                }
            }
        );
    }
}
