﻿import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Consulta } from '../../../models/consulta';
import { Especialidad } from '../../../models/especialidad';
import { ConsultasService } from '../../../services/consultas.service';

@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
  providers: [ ConsultasService ]
})
export class ModAddComponent implements OnInit {

  @Input() public consultas: Array<Consulta>;
  @Input() public especialidades: Array<Especialidad>;
  public consulta: Consulta;
  public exito: boolean;
  public mensaje: string;
  closeResult: string;
  
    constructor(private modalService: NgbModal, private consultasService: ConsultasService) {  }

    open(content) {
        this.modalService.open(content).result.then((result) => {
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
            return  `with: ${reason}`;
        }
    }

    ngOnInit() {
        this.consulta = new Consulta("","",0,new Especialidad('','',0),0.0);
    }

    onSubmit(){
        this.consultasService.add(this.consulta.clone()).subscribe(
            response=>{
                 console.log(response);
                 if(response.status == "exito") {
                    this.consulta.id=response.id;
                    this.consultas.push(this.consulta.clone());
                    this.exito=true;
                    this.mensaje=response.mensaje;
                 } else {
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
        
        //borrar las siguientes lineas cuando este la api
        //this.consultas.push(this.consulta.clone());
        //this.exito=true;
    }

    clear(){
        this.consulta.codigo="";
        this.consulta.nombre="";
        this.consulta.costo=0.0;
        this.exito=null;
    }

}
