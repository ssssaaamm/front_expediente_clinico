import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Especialidad } from '../../../models/especialidad';
import { EspecialidadesService } from '../../../services/especialidades.service';

@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss']
})
export class ModEditComponent implements OnInit {
  
    @Input() public especialidades: Array<Especialidad>; 
    @Input() public especialidad_original: Especialidad;
    public exito: boolean;
    especialidad_modificada: Especialidad;

    closeResult: string;

    constructor(private modalService: NgbModal, private especialidadesService: EspecialidadesService) { }

    ngOnInit() {
        this.especialidad_modificada = this.especialidad_original.clone();
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.especialidad_modificada = this.especialidad_original.clone();
            this.exito = null;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.especialidad_modificada = this.especialidad_original.clone();
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
        this.especialidadesService.edit(this.especialidad_modificada.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    /*this.especialidad_original = this.especialidad_modificada;
                    this.especialidad_modificada = this.especialidad_original.clone();*/

                    let pos = this.especialidades.indexOf(this.especialidad_original);
                    this.especialidades[pos]=this.especialidad_modificada.clone();
                    this.especialidad_original=this.especialidades[pos];
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

        //borrar estas lineas cuando este lista la apilet pos = this.especialidades.indexOf(this.especialidad_original);
        // let pos = this.especialidades.indexOf(this.especialidad_original);
        // this.especialidades[pos]=this.especialidad_modificada.clone();
        // this.especialidad_original=this.especialidades[pos];
        // this.exito=true;
    }
}
