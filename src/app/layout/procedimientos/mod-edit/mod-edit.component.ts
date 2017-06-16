import { Component, OnInit, Input, Output  } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Procedimiento } from '../../../models/procedimiento';
import { ProcedimientosService } from '../../../services/procedimientos.service';
import  createNumberMask from 'text-mask-addons/dist/createNumberMask';
@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss']
})
export class ModEditComponent implements OnInit {

  @Input() public procedimientos: Array<Procedimiento>; 
    @Input() public procedimiento_original: Procedimiento;
    public exito: boolean;
    public mensaje: string;
    procedimiento_modificado: Procedimiento;
    public costoMask = createNumberMask({
        allowDecimal: true,
        prefix:false
    })

    closeResult: string;

    constructor(private modalService: NgbModal, private procedimientosService: ProcedimientosService) { }

    ngOnInit() {
        this.procedimiento_modificado = this.procedimiento_original.clone();
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.procedimiento_modificado = this.procedimiento_original.clone();
            this.exito = null;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.procedimiento_modificado = this.procedimiento_original.clone();
            this.exito=null;
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

    onSubmit(){
        this.procedimientosService.edit(this.procedimiento_modificado.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                   let pos = this.procedimientos.indexOf(this.procedimiento_original);
                    this.procedimientos[pos]=this.procedimiento_modificado.clone();
                    this.procedimiento_original=this.procedimientos[pos];
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

        //borrar estas lineas cuando este lista la apilet pos = this.especialidades.indexOf(this.especialidad_original);
        // let pos = this.especialidades.indexOf(this.especialidad_original);
        // this.especialidades[pos]=this.especialidad_modificada.clone();
        // this.especialidad_original=this.especialidades[pos];
        // this.exito=true;
    }

}
