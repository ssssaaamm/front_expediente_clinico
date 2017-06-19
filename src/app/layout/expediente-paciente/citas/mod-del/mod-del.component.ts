import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CitasService } from "app/services/citas.service";

@Component({
  selector: 'app-mod-del',
  templateUrl: './mod-del.component.html',
  styleUrls: ['./mod-del.component.scss']
})

export class ModDelComponent implements OnInit {
  @Input() public asignacion_cita: any;
  @Input() public asignacion_citas: Array<any>;
  public exito:boolean;
  public mensaje: string;
  closeResult: string;
  constructor(private modalService: NgbModal, private citasService: CitasService) { }

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

  onSubmit(){

 this.citasService.del({"id":this.asignacion_cita.idCita}).subscribe(
        response=>{
            console.log(response);
            if(response.status == "exito"){
                let pos = this.asignacion_citas.indexOf(this.asignacion_cita);
                this.asignacion_citas.splice(pos,1);
                this.exito=true;
                this.mensaje = response.mensaje;
            }else{
                this.exito=false;
                this.mensaje = response.mensaje;
                
            }
        },
        error=>{
            if(error!=null) {
                console.log("Error al enviar la peticion: "+error);
            }
        }
    );

  }

  ngOnInit() {

   
  }

}
