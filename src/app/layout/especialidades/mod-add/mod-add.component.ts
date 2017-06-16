import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Especialidad } from '../../../models/especialidad';
import { EspecialidadesService } from '../../../services/especialidades.service';
import  createNumberMask from 'text-mask-addons/dist/createNumberMask';
@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
  providers: [ EspecialidadesService ]
})
export class ModAddComponent implements OnInit {
  
    @Input() public especialidades: Array<Especialidad>;
    public especialidad: Especialidad;
    public exito: boolean;
    public mensaje:string;
    public maskNames = [/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/
    ,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,]
    ;
    public costoMask = createNumberMask({
        allowDecimal: true,
        prefix:false
    })
    closeResult: string;
  
    constructor(private modalService: NgbModal, private especialidadesService: EspecialidadesService) {  }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.exito = null;
            this.especialidad.codigo="";
            this.especialidad.nombre="";
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.exito = null;
            this.especialidad.codigo="";
            this.especialidad.nombre="";
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

    ngOnInit() {
        this.especialidad=new Especialidad("","",null,null);
    }

    onSubmit(){
        this.especialidadesService.add(this.especialidad.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    this.especialidad.id=response.id;
                    this.especialidades.push(this.especialidad.clone());
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
        
        //borrar las siguientes lineas cuando este la api
        // this.especialidades.push(this.especialidad.clone());
        // this.exito=true;
    }

    clear(){
        this.especialidad.codigo="";
        this.especialidad.nombre="";
        this.exito=null;
    }

}
