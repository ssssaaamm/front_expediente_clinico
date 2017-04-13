import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionesService } from '../../../services/ubicaciones.service';

@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss']
})
export class ModEditComponent implements OnInit {

  @Input() public ubicaciones: Array<Ubicacion>; 
  @Input() public ubicacion_original: Ubicacion;
  public exito: boolean;
  ubicacion_modificada: Ubicacion;

  closeResult: string;

  constructor(private modalService: NgbModal, private ubicacionesService: UbicacionesService) { }

  ngOnInit() {
      this.ubicacion_modificada = this.ubicacion_original.clone();
  }

  open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          this.ubicacion_modificada = this.ubicacion_original.clone();
          this.exito = null;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.ubicacion_modificada = this.ubicacion_original.clone();
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
      this.ubicacionesService.edit(this.ubicacion_modificada.clone()).subscribe(
          response=>{
              console.log("error: "+JSON.stringify(response));
              if(response.status == "exito"){
                  let pos = this.ubicaciones.indexOf(this.ubicacion_original);
                  this.ubicaciones[pos]=this.ubicacion_modificada.clone();
                  this.ubicacion_original=this.ubicaciones[pos];
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

      //borrar estas lineas cuando este lista la apilet pos = this.ubicaciones.indexOf(this.ubicacion_original);
      let pos = this.ubicaciones.indexOf(this.ubicacion_original);
      this.ubicaciones[pos]=this.ubicacion_modificada.clone();
      this.ubicacion_original=this.ubicaciones[pos];
      this.exito=true;
  }

}
