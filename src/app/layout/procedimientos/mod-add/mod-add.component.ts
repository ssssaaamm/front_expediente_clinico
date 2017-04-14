import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Procedimiento } from '../../../models/procedimiento';
import { ProcedimientosService } from '../../../services/procedimientos.service';

@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
})
export class ModAddComponent implements OnInit {

  @Input() public procedimientos: Array<Procedimiento>;
    public procedimiento: Procedimiento;
    public exito: boolean;
    closeResult: string;
  
    constructor(private modalService: NgbModal, private procedimientosService: ProcedimientosService) {  }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.exito = null;
            this.procedimiento.codigo="";
            this.procedimiento.nombre="";
            this.procedimiento.costo=0.0;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.exito = null;
            this.procedimiento.codigo="";
            this.procedimiento.nombre="";
            this.procedimiento.costo=0.0;


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
        this.procedimiento=new Procedimiento("","",0.0 );
    }

    onSubmit(){
        this.procedimientosService.add(this.procedimiento.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                     this.procedimiento.id=response.id;
                    this.procedimientos.push(this.procedimiento.clone());
                    this.exito=true;
                }else{
                    this.exito=false;
                }
            },
            error=>{
                if(error!=null) {
                    console.log("Error al enviar la peticion: "+error);
                }
            }
        );
        
        //borrar las siguientes lineas cuando este la api
        this.procedimientos.push(this.procedimiento.clone());
        this.exito=true;
    }

    clear(){
        this.procedimiento.codigo="";
        this.procedimiento.nombre="";
        this.procedimiento.costo=0.0;
        this.exito=null;
    }

}
