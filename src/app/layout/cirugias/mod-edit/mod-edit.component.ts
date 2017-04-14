import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Cirugia } from '../../../models/cirugia';
import { CirugiasService } from '../../../services/cirugias.service';

@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss'],
  providers: [CirugiasService]
})
export class ModEditComponent implements OnInit {

  @Input() public cirugias: Array<Cirugia>; 
  @Input() public cirugia_original: Cirugia;
  public exito: boolean;
  cirugia_modificada: Cirugia;

  closeResult: string;

  constructor(private modalService: NgbModal, private cirugiasService: CirugiasService) { }

  ngOnInit() {
      this.cirugia_modificada = this.cirugia_original.clone();
  }

  open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          this.cirugia_modificada = this.cirugia_original.clone();
          this.exito = null;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.cirugia_modificada = this.cirugia_original.clone();
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
    //   this.cirugiasService.edit(this.cirugia_modificada.clone()).subscribe(
    //       response=>{
    //           console.log("error: "+JSON.stringify(response));
    //           if(response.status == "exito"){
    //               let pos = this.cirugias.indexOf(this.cirugia_original);
    //               this.cirugias[pos]=this.cirugia_modificada.clone();
    //               this.cirugia_original=this.cirugias[pos];
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

      //borrar estas lineas cuando este lista la apilet pos = this.cirugias.indexOf(this.cirugia_original);
      let pos = this.cirugias.indexOf(this.cirugia_original);
      this.cirugias[pos]=this.cirugia_modificada.clone();
      this.cirugia_original=this.cirugias[pos];
      this.exito=true;
  }

}