import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Consulta } from "app/models/consulta";
import { Especialidad } from "app/models/especialidad";
import { LoginService } from "app/services/login.service";
import { ConsultasService } from "app/services/consultas.service";
import { EspecialidadesService } from "app/services/especialidades.service";
import { PacientesService } from "app/services/pacientes.service";
import { CitasService } from "app/services/citas.service";
import { Router, ActivatedRoute } from '@angular/router';

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
  providers: [CitasService]

})
export class CitasComponent implements OnInit {

  closeResult: string;
  public exito: boolean;
  public mensaje: string;
  returnUrl: string;
  public citas: Array<any>

  public consultas: Array<Consulta> = new Array<Consulta>();
  public especialidades: Array<Especialidad> = new Array<Especialidad>();

  constructor(private modalService: NgbModal, private route: ActivatedRoute,
    private router: Router,
    private citasService: CitasService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['/atencion'];
    let identidad = JSON.parse(localStorage.getItem("identity"));
    console.log("ENVIANDO IDENTIDAD: " + JSON.stringify(identidad));
    this.citasService.listCitas(identidad).subscribe(
      response => {
        console.log(response);
        this.citas = response;
        /* console.log(JSON.stringify(citas));*/
      },
      error => {
        if (error != null) {
          console.log("Error al enviar la peticion: " + error);
        }
      }
    );

  }
  guardarCita(cita) {
    localStorage.setItem('cita', JSON.stringify(cita));
    console.log(JSON.stringify(cita));
    console.log("Holis")
    /*this.router.navigateByUrl(this.returnUrl);*/
  }

  clear() {

  }

}
