import { Component, OnInit, Input,  EventEmitter, trigger, transition, style, animate } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Empleado } from "app/models/empleado";
import {EmpleadosService} from "app/services/empleados.service";
import {Usuario} from "app/models/usuario"
import{Medico} from "app/models/medico"
import { PaisesService } from "app/services/paises.service";

@Component({
  selector: 'app-mod-edit',
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
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss'],
  providers: [EmpleadosService,PaisesService, NgbModal]
})
export class ModEditComponent implements OnInit {
@Input() public paises: Array<any>;//<--- todos los paises 
@Input() public empleados: Array<Empleado>;
@Input() public empleado_original: Empleado; 
@Input() public medico: Medico;
empleado_modificado: Empleado;



//todas las regiones de los paises
  public regionesEmpleado: Array<any> = new Array<any>();//<--sera pasado al componente add y edit
  //todas las ciudades de las regiones
  public ciudadesEmpleado: Array<any> = new Array<any>();//<--sera pasado al componente add y edit

  public selectedCountryEmpleado: any;
  public selectedRegionEmpleado: any;
  public selectedCityEmpleado: any;
  public estaCasada: boolean = false;

  public esMedico: boolean=false;

  public paso1: boolean = true;
  public paso2: boolean = false;

  public exito: boolean;
  public mensaje: string;

closeResult: string;
  constructor(private modalService: NgbModal,private paisesService: PaisesService, private empleadosService: EmpleadosService) { }

  ngOnInit() {
    this.empleado_modificado=this.empleado_original.clone();
  }
  open(content){
     this.modalService.open(content ,{size:'lg'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          //let espe=this.empleado_original.medico.especialidad;
          this.empleado_modificado = this.empleado_original.clone();
          //prueba
          //this.empleado_modificado.medico.especialidad=espe;    
          this.exito = null;
         },(reason) => {
           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.empleado_modificado = this.empleado_original.clone();
          this.exito=null;
         });

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
          return  `with: ${reason}`;
      }
  }
onChangePaisEmpleado() {
    //obtenemos todos las regiones
    this.paisesService.listRegions(this.selectedCountryEmpleado.code)
      .map((regions: Array<any>) => {
        return regions;
      })
      .subscribe(res => this.regionesEmpleado = res);

    this.ciudadesEmpleado = new Array<any>();

    console.log(this.selectedCountryEmpleado.name);
    this.empleado_modificado.pais = this.selectedCountryEmpleado.name;
  }

  onChangeRegionEmpleado() {
    //obtenemos todos las ciudades
    this.paisesService.listCities(this.selectedCountryEmpleado.code, this.selectedRegionEmpleado.region)
      .map((cities: Array<any>) => {
        return cities;
      })
      .subscribe(res => this.ciudadesEmpleado = res);

    console.log(this.selectedRegionEmpleado.region);
    this.empleado_modificado.division = this.selectedRegionEmpleado.region;
  }

  onChangeCiudadEmpleado() {
    console.log(this.selectedCityEmpleado.city);
    this.empleado_modificado.subdivision = this.selectedCityEmpleado.city;
  }
  onChangeCasada() {
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

  onSubmit(){
    this.empleadosService.edit(this.empleado_modificado.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    /*this.empleado_original = this.empleado_modificado;
                    this.empleado_modificado = this.empleado_original.clone();*/

                    let pos = this.empleados.indexOf(this.empleado_original);
                    this.empleados[pos]=this.empleado_modificado.clone();
                    //this.empleados[pos].usuario=this.empleado_modificado.usuario;
                    //this.empleados[pos].medico=this.empleado_modificado.medico;
                    //this.empleados[pos].pais=this.empleado_modificado.pais;
                    this.empleado_original=this.empleados[pos];
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
  
  private rellenarPaises() {

    // Empleados
    this.paises.forEach((pais) => {
      if (this.empleado_modificado.pais == pais.name) {
        this.selectedCountryEmpleado = pais;
        this.onChangePaisEmpleado();
      }
    });

    setTimeout(() => {
      this.regionesEmpleado.forEach((region) => {
        if (this.empleado_modificado.division == region.region) {
          this.selectedRegionEmpleado = region;
          this.onChangeRegionEmpleado();
        }
      });

      setTimeout(() => {
        this.ciudadesEmpleado.forEach((ciudad) => {
          if (this.empleado_modificado.subdivision == ciudad.city) {
            this.selectedCityEmpleado = ciudad;
            this.onChangeCiudadEmpleado();
          }
        });
      }, 1500);
    }, 1500);
}}

