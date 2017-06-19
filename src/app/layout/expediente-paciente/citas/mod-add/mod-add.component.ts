import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CitasService } from "app/services/citas.service";
import { Especialidad } from "app/models/especialidad";
import { Medico } from 'app/models/medico';
import { Consulta } from 'app/models/consulta';
import { ConsultasService } from 'app/services/consultas.service';
import { PeticionesService } from "app/services/peticiones.service";
@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
  providers: [CitasService, ConsultasService, PeticionesService]
})
export class ModAddComponent implements OnInit {

  //public fecha_cita:any;
  // public hora_cita:any = {hour: 13, minute: 30};

  @Input() asignacion_citas:Array<any>;
  public exito: boolean;
  public mensaje: string;
  public consultas: Array<any> = new Array<any>();
  public medicos: Array<any> = new Array<any>();
  public cita: any = {};
  closeResult: string;

  constructor(private modalService: NgbModal, private citasService: CitasService, private consultasService: ConsultasService, private peticionesService: PeticionesService) { }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //   this.clearFields();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //   this.clearFields();
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
    this.obtenerServicioConsulta();
    this.cita.paciente = JSON.parse(localStorage.getItem('identity')).id;
  }

  obtenerServicioConsulta() {
    this.consultasService.listServices()
      .map((consultas: Array<any>) => {
        return consultas;
      })
      .subscribe(res => this.consultas = res);

  }

  onSubmit() {

    this.citasService.add(this.cita).subscribe(
      response => {
        console.log(response);
        if (response.status == "exito") {
          this.cita.id = response.id;
          this.exito = true;
          this.mensaje = response.mensaje;
          this.recargarCitas();
        } else {
          this.exito = false;
          this.mensaje = response.mensaje;
        }
      },
      error => {
        if (error != null) {
          console.log("Error al enviar la peticion: " + error);
        }
      }
    );

  }

  recargarCitas() {
        let identidad = JSON.parse(localStorage.getItem("identity"));

        console.log("ENVIANDO IDENTIDAD: " + JSON.stringify(identidad));
        this.citasService.detail1(identidad).subscribe(
            response => {
                console.log(response);
                this.asignacion_citas = response;
            },
            error => {
                if (error != null) {
                    console.log("Error al enviar la peticion: " + error);
                }
            }
        );
    }

  onChangeServicioConsulta() {
    this.peticionesService.medicosEspecialidad({ "id": this.cita.consulta.idEspecialidad.idEspecialidad })
      .map((medicos: Array<any>) => {
        console.log(JSON.stringify(medicos));
        return medicos;
      })
      .subscribe(res => this.medicos = res);
  }

}
