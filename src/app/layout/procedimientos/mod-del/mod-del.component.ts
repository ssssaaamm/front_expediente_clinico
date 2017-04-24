import { Component, OnInit, Input } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Procedimiento } from '../../../models/procedimiento';
import { ProcedimientosService } from '../../../services/procedimientos.service';

@Component({
  selector: 'app-mod-del',
  templateUrl: './mod-del.component.html',
  styleUrls: ['./mod-del.component.scss']
})
export class ModDelComponent implements OnInit {
@Input() public procedimiento: Procedimiento;
  @Input() public procedimientos: Array<Procedimiento>;
  public mensaje: string;
  public exito:boolean;

  closeResult: string;
  constructor(private modalService: NgbModal, private procedimientosService: ProcedimientosService) { }

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
    this.procedimientosService.del(this.procedimiento.clone()).subscribe(
        response=>{
            console.log(response);
            if(response.status == "exito"){
                let pos = this.procedimientos.indexOf(this.procedimiento);
                this.procedimientos.splice(pos,1);
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

  }  
}
