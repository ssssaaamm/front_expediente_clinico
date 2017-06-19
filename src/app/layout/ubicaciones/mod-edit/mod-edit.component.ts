import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionesService } from '../../../services/ubicaciones.service';
import { TipoUbicacion } from "app/models/tipo_ubicacion";

@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss']
})
export class ModEditComponent implements OnInit {

  @Input() public ubicaciones: Array<Ubicacion>; 
  @Input() public ubicacion_original: Ubicacion;
   @Input() public tipos_ubicacion: Array<TipoUbicacion>;
  public exito: boolean;
  public mensaje:string;
  ubicacion_modificada: Ubicacion;

  closeResult: string;

  constructor(private modalService: NgbModal, private ubicacionesService: UbicacionesService) { }

  ngOnInit() {
          //rellena los campos con los valores segun el ubicacion a editar
        let tip=this.ubicacion_original.tipo;
        this.ubicacion_modificada = this.ubicacion_original.clone();
        this.ubicacion_modificada.tipo=tip; //el tipo no lo tenemos que clonar
  }

  open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`; 
            let tip=this.ubicacion_original.tipo;
            this.ubicacion_modificada = this.ubicacion_original.clone();
            this.ubicacion_modificada.tipo=tip;
            this.exito = null;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            let tip=this.ubicacion_original.tipo;
            this.ubicacion_modificada = this.ubicacion_original.clone();
            this.ubicacion_modificada.tipo=tip;
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
                console.log(response);
                if(response.status == "exito"){
                    /**this.ubicacion_original = this.ubicacion_modificado;
                    this.ubicacion_modificado = this.ubicacion_original.clone();**/
                    let pos = this.ubicaciones.indexOf(this.ubicacion_original);
                    this.ubicaciones[pos]=this.ubicacion_modificada.clone();
                    this.ubicaciones[pos].tipo=this.ubicacion_modificada.tipo;
                    this.ubicacion_original=this.ubicaciones[pos];
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

        /*borrar estas lineas cuando este lista la apilet pos = this.ubicaciones.indexOf(this.ubicacion_original);
        let pos = this.ubicaciones.indexOf(this.ubicacion_original);
         this.ubicaciones[pos]=this.ubicacion_modificado.clone();
         this.ubicacion_original=this.ubicaciones[pos];
         this.exito=true;*/ 
    }

}
