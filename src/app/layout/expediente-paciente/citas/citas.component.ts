import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CitasService } from "app/services/citas.service"

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
  providers: [CitasService]
})
export class CitasComponent implements OnInit {

  public asignacion_citas: Array<any>;
  public exito: boolean;
  public mensaje: string;
  closeResult: string;


  constructor(private modalService: NgbModal, private citasService: CitasService) { }

  ngOnInit() {

     let identidad = JSON.parse(localStorage.getItem("identity"));

    console.log("ENVIANDO IDENTIDAD: " + JSON.stringify(identidad));
     this.citasService.detail1(identidad).subscribe(
            response=>{
                console.log(response);
               this.asignacion_citas = response;
            },
            error=>{
                if(error!=null) {
                    console.log("Error al enviar la peticion: "+error);
                }
            }
        );
  }

}
