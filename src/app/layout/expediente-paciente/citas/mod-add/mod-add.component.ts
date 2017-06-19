import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CitasService } from "app/services/citas.service";
import { Especialidad } from "app/models/especialidad";
import { Medico } from 'app/models/medico';
import { Consulta } from 'app/models/consulta';
import { ConsultasService } from 'app/services/consultas.service';
@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
  providers: [CitasService,ConsultasService]
})
export class ModAddComponent implements OnInit {

  //public fecha_cita:any;
 // public hora_cita:any = {hour: 13, minute: 30};

  public exito: boolean;
  public mensaje: string;
  public consultas:  Array<any> = new Array<any>();
  public cita: any={};
  closeResult: string;

  constructor(private modalService: NgbModal, private citasService: CitasService, private consultasService: ConsultasService) { }

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
  }

  obtenerServicioConsulta(){
    this.consultasService.listServices()
    .map((consultas: Array<any>)=>{
      return consultas;
    })
    .subscribe( res => this.consultas = res);

  }
 
  onSubmit() {
/*
            this.citasService.add(this.cita).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    this.examen.id=response.id;
                    this.examenes.push(this.examen.clone());
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

  }*/


  }
}
