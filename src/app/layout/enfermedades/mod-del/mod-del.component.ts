import { Component, OnInit, Input} from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Enfermedad } from '../../../models/enfermedad';
import { EnfermedadesService } from '../../../services/enfermedades.service';

@Component({
  selector: 'app-mod-del',
  templateUrl: './mod-del.component.html',
  styleUrls: ['./mod-del.component.scss'],
  providers: [EnfermedadesService]
})
export class ModDelComponent implements OnInit {

  @Input() public enfermedad: Enfermedad;
  @Input() public enfermedades: Array<Enfermedad>;
  public mensaje:string;
  public exito:boolean;

  closeResult: string;
  constructor(private modalService: NgbModal, private enfermedadesService: EnfermedadesService) { }

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
    this.enfermedadesService.del(this.enfermedad.clone()).subscribe(
        response=>{
            console.log(response);
            if(response.status == "exito"){
                let pos = this.enfermedades.indexOf(this.enfermedad);
                this.enfermedades.splice(pos,1);
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
