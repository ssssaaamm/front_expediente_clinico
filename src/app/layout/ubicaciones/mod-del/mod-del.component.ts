import { Component, OnInit, Input} from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionesService } from '../../../services/ubicaciones.service';

@Component({
  selector: 'app-mod-del',
  templateUrl: './mod-del.component.html',
  styleUrls: ['./mod-del.component.scss'],
  providers: [UbicacionesService]
})
export class ModDelComponent implements OnInit {

  @Input() public ubicacion: Ubicacion;
  @Input() public ubicaciones: Array<Ubicacion>;
  public exito:boolean;

  closeResult: string;
  constructor(private modalService: NgbModal, private ubicacionesService: UbicacionesService) { }

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
    this.ubicacionesService.del(this.ubicacion.clone()).subscribe(
         response=>{
             console.log(response);
             if(response.status == "exito"){
                 let pos = this.ubicaciones.indexOf(this.ubicacion);
                 this.ubicaciones.splice(pos,1);
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

    //borrar las siguientes lineas cuando este lista la api
    /*let pos = this.ubicaciones.indexOf(this.ubicacion);
    this.ubicaciones.splice(pos,1);
    this.exito=true;*/
  }

}
