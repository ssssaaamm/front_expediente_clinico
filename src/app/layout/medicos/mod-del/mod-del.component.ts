import { Component, OnInit, Input } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Medico } from "app/models/medico";
import { MedicosService } from "app/services/medicos.service";


@Component({
  selector: 'app-mod-del',
  templateUrl: './mod-del.component.html',
  styleUrls: ['./mod-del.component.scss']
})
export class ModDelComponent implements OnInit {
    @Input() public medico: Medico;
    @Input() public medicos: Array<Medico>;
    public exito:boolean;
    public mensaje:string;

  closeResult: string;
  constructor(private modalService: NgbModal,private medicosService: MedicosService) { }

  open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
    /*this.medicosService.del(this.medico.clone()).subscribe(
        response=>{
            console.log(response);
            if(response.status == "exito"){
                let pos = this.medicos.indexOf(this.medico);
                this.medicos.splice(pos,1);
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
    );*/

    /*borrar las siguientes lineas cuando este lista la api*/
     let pos = this.medicos.indexOf(this.medico);
     this.medicos.splice(pos,1);
     this.exito=true;
  }


}
