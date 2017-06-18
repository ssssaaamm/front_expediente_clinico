import { Component, OnInit, Input } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Cirugia } from '../../../models/cirugia';
import { Especialidad } from '../../../models/especialidad';
import { CirugiasService } from '../../../services/cirugias.service';

@Component({
  selector: 'app-cirugias',
  templateUrl: './cirugias.component.html',
  styleUrls: ['./cirugias.component.scss'],
  providers:[CirugiasService]
})
export class CirugiasComponent implements OnInit {
  public asignacion_cirugia: Array<any>;
  public exito: boolean;
  public mensaje: string;

  constructor(private modalService: NgbModal, private cirugiasService: CirugiasService) { }

  ngOnInit() {
     let identidad = JSON.parse(localStorage.getItem("identity"));

    console.log("ENVIANDO IDENTIDAD: " + JSON.stringify(identidad));
     this.cirugiasService.detail(identidad).subscribe(
            response=>{
                console.log(response);
               this.asignacion_cirugia = response;
            },
            error=>{
                if(error!=null) {
                    console.log("Error al enviar la peticion: "+error);
                }
            }
        );
  }

}
