import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Procedimiento } from '../../../models/procedimiento';
import { ProcedimientosService } from '../../../services/procedimientos.service';
import  createNumberMask from 'text-mask-addons/dist/createNumberMask';
@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
})
export class ModAddComponent implements OnInit {

  @Input() public procedimientos: Array<Procedimiento>;
    public procedimiento: Procedimiento;
    public exito: boolean;
    public mensaje: string;
    public costoMask = createNumberMask({
        allowDecimal: true,
        prefix:''
    })
    public maskNames = [/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,
    /^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/];
    closeResult: string;
  
    constructor(private modalService: NgbModal, private procedimientosService: ProcedimientosService) {  }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.exito = null;
            this.procedimiento.codigo="";
            this.procedimiento.nombre="";
            this.procedimiento.costo=null;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.exito = null;
            this.procedimiento.codigo="";
            this.procedimiento.nombre="";
            this.procedimiento.costo=null;


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
        this.procedimiento=new Procedimiento("","",null);
    }

    onSubmit(){
        this.procedimientosService.add(this.procedimiento.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    this.procedimiento.id=response.id;
                    this.procedimientos.push(this.procedimiento.clone());
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
        // this.procedimientos.push(this.procedimiento.clone());
        // this.exito=true;
    }

    clear(){
        this.procedimiento.codigo="";
        this.procedimiento.nombre="";
        this.procedimiento.costo=null;
        this.exito=null;
    }

}
