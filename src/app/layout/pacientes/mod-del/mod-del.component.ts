import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import { Paciente } from "app/models/paciente";
import { PacientesService } from "app/services/pacientes.service";

@Component({
  selector: 'app-mod-del',
  templateUrl: './mod-del.component.html',
  styleUrls: ['./mod-del.component.scss']
})
export class ModDelComponent implements OnInit {
@Input() public paciente: Paciente;
@Input() public pacientes: Array<Paciente>;
public exito:boolean;
public mensaje: string;
closeResult: string;

  constructor(private modalService: NgbModal, private pacientesService: PacientesService) { }
 open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          this.exito=null;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
  ngOnInit() {
  }

  onSubmit(){
    this.pacientesService.del(this.paciente.clone()).subscribe(
        response=>{
            console.log(response);
            if(response.status == "exito"){
                let pos = this.pacientes.indexOf(this.paciente);
                this.pacientes.splice(pos,1);
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

    /*borrar las siguientes lineas cuando este lista la api
     let pos = this.examenes.indexOf(this.examen);
     this.examenes.splice(pos,1);
     this.exito=true;*/
  }

}
