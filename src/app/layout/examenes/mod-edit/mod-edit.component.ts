import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Examen } from "app/models/examen";
import { ExamenesService } from "app/services/examenes.service";

@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss']
})
export class ModEditComponent implements OnInit { @Input() public examenes: Array<Examen>; 
    @Input() public examen_original: Examen;
    public exito: boolean;
    examen_modificado: Examen;

    closeResult: string;

    constructor(private modalService: NgbModal, private examenesService: ExamenesService) { }

    ngOnInit() {
        this.examen_modificado = this.examen_original.clone();
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.examen_modificado = this.examen_original.clone();
            this.exito = null;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.examen_modificado = this.examen_original.clone();
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
        this.examenesService.edit(this.examen_modificado.clone()).subscribe(
            response=>{
                console.log("error: "+JSON.stringify(response));
                if(response.status == "exito"){
                    /**this.examen_original = this.examen_modificado;
                    this.examen_modificado = this.examen_original.clone();**/
                   let pos = this.examenes.indexOf(this.examen_original);
                    this.examenes[pos]=this.examen_modificado.clone();
                     this.examen_original=this.examenes[pos];
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

        /*borrar estas lineas cuando este lista la apilet pos = this.examenes.indexOf(this.examen_original);
        let pos = this.examenes.indexOf(this.examen_original);
         this.examenes[pos]=this.examen_modificado.clone();
         this.examen_original=this.examenes[pos];
         this.exito=true;*/ 
    }
}
