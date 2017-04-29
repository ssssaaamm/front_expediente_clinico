import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Enfermedad } from '../../../models/enfermedad';
import { EnfermedadesService } from '../../../services/enfermedades.service';

@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss']
})
export class ModEditComponent implements OnInit {

  @Input() public enfermedades: Array<Enfermedad>; 
  @Input() public enfermedad_original: Enfermedad;
  public exito: boolean;
  enfermedad_modificada: Enfermedad;

  closeResult: string;

  constructor(private modalService: NgbModal, private enfermedadesService: EnfermedadesService) { }

  ngOnInit() {
      this.enfermedad_modificada = this.enfermedad_original.clone();
  }

  open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          this.enfermedad_modificada = this.enfermedad_original.clone();
          this.exito = null;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.enfermedad_modificada = this.enfermedad_original.clone();
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
    this.enfermedadesService.edit(this.enfermedad_modificada.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    /*this.especialidad_original = this.especialidad_modificada;
                    this.especialidad_modificada = this.especialidad_original.clone();*/

                    let pos = this.enfermedades.indexOf(this.enfermedad_original);
                    this.enfermedades[pos]=this.enfermedad_modificada.clone();
                    this.enfermedad_original=this.enfermedades[pos];
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
  }

}
