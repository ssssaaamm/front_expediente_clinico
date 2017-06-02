import { Component, OnInit, Output, Input, EventEmitter, trigger, transition, style, animate } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {PaisesService} from 'app/services/paises.service';
import {PacientesService} from 'app/services/pacientes.service';
import {Paciente} from 'app/models/paciente';
import {Padre} from 'app/models/padre';
import {Responsable} from 'app/models/responsable';
import {Enfermedad} from 'app/models/enfermedad';
import {Expediente} from 'app/models/expediente';

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

  //todos los paises
  @Input() public paises: Array<any>;
  //todas las regiones de los paises
  public regiones:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  //todas las ciudades de las regiones
  public ciudades:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  public selectedCountry:any;
  public selectedRegion:any;
  public selectedCity:any;
  
  public paciente: Paciente ;//<--el nuevo paciente a registrar
  
  public paso1:boolean=true;
  public paso2:boolean=false;
  public paso3:boolean=false;
  
  public exito: boolean;
  public mensaje: string;


  closeResult: string;
  
  constructor(private modalService: NgbModal,private paisesService:PaisesService, private pacientesService: PacientesService) {

  }

  ngOnInit() {
    this.paciente=new Paciente('','','','','','',0,0,0,'M','','','','','','',null,new Responsable('','','','','','','','','',0)/*,new Padre('','','','','M','','','',new Array<Enfermedad>()),new Padre('','','','','F','','','',new Array<Enfermedad>())*/,new Array<Enfermedad>(),null,0);
    this.paciente.madre=new Padre('','','','','','M','','','',new Array<Enfermedad>());
    this.paciente.padre=new Padre('','','','','','F','','','',new Array<Enfermedad>());
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
      this.paciente.pais=this.selectedCountry.name;
    }

    onChangeRegion(){
      //obtenemos todos las ciudades
      this.paisesService.listCities(this.selectedCountry.code,this.selectedRegion.region)
      .map((cities: Array<any>)=>{
        return cities;
      })
      .subscribe( res => this.ciudades=res);

      console.log(this.selectedRegion.region);
      this.paciente.division=this.selectedRegion.region;
    }

    onChangeCiudad(){
      console.log(this.selectedCity.city);
      this.paciente.subdivision=this.selectedCity.city;
    }

    onSubmit(){

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
}
