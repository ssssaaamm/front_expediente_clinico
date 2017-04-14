import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Medicamento } from "app/models/medicamento";
import { MedicamentosService } from "app/services/medicamentos.service";

@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss']
})
export class ModEditComponent implements OnInit {

  
    @Input() public medicamentos: Array<Medicamento>; 
    @Input() public medicamento_original: Medicamento;
    public exito: boolean;
    medicamento_modificado: Medicamento;

    closeResult: string;

    constructor(private modalService: NgbModal, private medicamentosService: MedicamentosService) { }

    ngOnInit() {
        this.medicamento_modificado = this.medicamento_original.clone();
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.medicamento_modificado = this.medicamento_original.clone();
            this.exito = null;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.medicamento_modificado = this.medicamento_original.clone();
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
        this.medicamentosService.edit(this.medicamento_modificado.clone()).subscribe(
            response=>{
                console.log("error: "+JSON.stringify(response));
                if(response.status == "exito"){
                    /*this.medicamento_original = this.medicamento_modificado;
                    this.medicamento_modificado = this.medicamento_original.clone();*/
                    let pos = this.medicamentos.indexOf(this.medicamento_original);
                    this.medicamentos[pos]=this.medicamento_modificado.clone();
                    this.medicamento_original=this.medicamentos[pos];
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

        /*borrar estas lineas cuando este lista la apilet pos = this.medicamentos.indexOf(this.medicamento_original);
         let pos = this.medicamentos.indexOf(this.medicamento_original);
         this.medicamentos[pos]=this.medicamento_modificado.clone();
         this.medicamento_original=this.medicamentos[pos];
         this.exito=true;*/
    }
}
