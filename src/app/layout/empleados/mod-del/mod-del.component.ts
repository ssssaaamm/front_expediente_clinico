import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import { Empleado } from "app/models/empleado";
import { EmpleadosService } from "app/services/empleados.service";

@Component({
  selector: 'app-mod-del',
  templateUrl: './mod-del.component.html',
  styleUrls: ['./mod-del.component.scss']
})
export class ModDelComponent implements OnInit {
@Input() public empleado: Empleado;
@Input() public empleados: Array<Empleado>;
public exito:boolean;
public mensaje: string;
closeResult: string;

  constructor(private modalService: NgbModal, private empleadosService: EmpleadosService) { }
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
    this.empleadosService.del(this.empleado.clone()).subscribe(
        response=>{
            console.log(response);
            if(response.status == "exito"){
                let pos = this.empleados.indexOf(this.empleado);
                this.empleados.splice(pos,1);
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
