import { Component, OnInit, Input} from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Especialidad } from '../../../models/especialidad';
import { EspecialidadesService } from '../../../services/especialidades.service';

@Component({
  selector: 'app-mod-del',
  templateUrl: './mod-del.component.html',
  styleUrls: ['./mod-del.component.scss'],
  providers: [EspecialidadesService]
})
export class ModDelComponent implements OnInit {
  
  @Input() public especialidad: Especialidad;
  @Input() public especialidades: Array<Especialidad>;
  public exito:boolean;

  closeResult: string;
  constructor(private modalService: NgbModal, private especialidadesService: EspecialidadesService) { }

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
    this.especialidadesService.del(this.especialidad.clone()).subscribe(
        response=>{
            if(response.status == "exito"){
                let pos = this.especialidades.indexOf(this.especialidad);
                this.especialidades.splice(pos,1);
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
    // let pos = this.especialidades.indexOf(this.especialidad);
    // this.especialidades.splice(pos,1);
    // this.exito=true;
  }
}
