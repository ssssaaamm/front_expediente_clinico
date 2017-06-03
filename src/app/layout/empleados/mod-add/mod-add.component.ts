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

  //todos los paises
  @Input() public paises: Array<any>;
  //todas las regiones de los paises
  public regiones:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  //todas las ciudades de las regiones
  public ciudades:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  public selectedCountry:any;
  public selectedRegion:any;
  public selectedCity:any;
  
  public empleado: Empleado ;//<--el nuevo empleado a registrar

  public exito: boolean;
  public mensaje: string;


  closeResult: string;
  constructor(private modalService: NgbModal, private paisesService:PaisesService, private empleadosService: EmpleadosService) {}
 
  ngOnInit() {
    this.empleado= new Empleado ("", "", "", "", "", "", "", "", "", "", "", "",
      new Usuario("", "", true, new Rol("", "", 0), 0),
      new Medico(new Especialidad("", "", 0), "", 0), 0);
  }
   open(content) {
        this.modalService.open(content,{size:'lg'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
      
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      
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

}
