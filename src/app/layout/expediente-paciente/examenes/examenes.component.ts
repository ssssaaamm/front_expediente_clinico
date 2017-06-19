import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Examen } from "app/models/examen";
import { ExamenesService } from "app/services/examenes.service";
import { TipoExamen } from 'app/models/tipo_examen';
@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.scss'],
  providers: [ExamenesService]
})

export class ExamenesComponent implements OnInit {

  public asignaciones_examen: Array<any>;

  public exito: boolean;
  public mensaje: string;
  examen_modificado: Examen;
  closeResult: string;
  constructor(private modalService: NgbModal, private examenesService: ExamenesService) { }


  ngOnInit() {
    let identidad = JSON.parse(localStorage.getItem("identity"));

    console.log("ENVIANDO IDENTIDAD: " + JSON.stringify(identidad));
     this.examenesService.detail(identidad).subscribe(
            response=>{
                console.log(response);
               this.asignaciones_examen = response;
            },
            error=>{
                if(error!=null) {
                    console.log("Error al enviar la peticion: "+error);
                }
            }
        );


  }
}