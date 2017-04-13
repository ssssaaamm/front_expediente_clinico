import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Consulta } from '../../../models/consulta';
import { ConsultasService } from '../../../services/consultas.service';

@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss']
})
export class ModEditComponent implements OnInit {

  @Input() public consultas: Array<Consulta>; 
  @Input() public consulta_original: Consulta;
  public exito: boolean;
  consulta_modificada: Consulta;

  closeResult: string;

  constructor(private modalService: NgbModal, private consultasService: ConsultasService) { }

  ngOnInit() {
      this.consulta_modificada = this.consulta_original.clone();
  }

  open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          this.consulta_modificada = this.consulta_original.clone();
          this.exito = null;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.consulta_modificada = this.consulta_original.clone();
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
    //   this.consultasService.edit(this.consulta_modificada.clone()).subscribe(
    //       response=>{
    //           console.log("error: "+JSON.stringify(response));
    //           if(response.status == "exito"){
    //               let pos = this.consultas.indexOf(this.consulta_original);
    //               this.consultas[pos]=this.consulta_modificada.clone();
    //               this.consulta_original=this.consultas[pos];
    //               this.exito=true;
    //           }else{
    //               this.exito=false;
    //           }
    //       },
    //       error=>{
    //           if(error!=null) {
    //               console.log("Error al enviar la peticion: "+error);
    //           }
    //       }
    //   );

      //borrar estas lineas cuando este lista la apilet pos = this.consultas.indexOf(this.consulta_original);
      let pos = this.consultas.indexOf(this.consulta_original);
      this.consultas[pos]=this.consulta_modificada.clone();
      this.consulta_original=this.consultas[pos];
      this.exito=true;
  }

}
