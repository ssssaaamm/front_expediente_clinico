import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Consulta } from "app/models/consulta";
import { Especialidad } from "app/models/especialidad";
import { LoginService } from "app/services/login.service";
import { ConsultasService } from "app/services/consultas.service";
import { EspecialidadesService } from "app/services/especialidades.service";


@Component({
  selector: 'app-citas',
    animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        // transition(':leave', [
        //   style({transform: 'translateX(0)', opacity: 1}),
        //   animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        // ])
      ]
    )
  ],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
    providers: [ConsultasService, LoginService, EspecialidadesService]

})
export class CitasComponent implements OnInit {
  modalService: any;
  closeResult: string;
  public exito: boolean;
  public mensaje: string;



 public consultas: Array<Consulta> = new Array<Consulta>();
  public especialidades: Array<Especialidad> = new Array<Especialidad>();

  constructor(
    private loginService: LoginService,
    private consultasService: ConsultasService,
    private especialidadesService: EspecialidadesService) { }
 
  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.clear();


    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.clear();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit() {
  }

  clear(){

  }

}
