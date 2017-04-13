import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionesService } from '../../../services/ubicaciones.service';

@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
  providers: [ UbicacionesService ]
})
export class ModAddComponent implements OnInit {

  @Input() public ubicaciones: Array<Ubicacion>;
    public ubicacion: Ubicacion;
    public exito: boolean;
    closeResult: string;
  
    constructor(private modalService: NgbModal, private ubicacionesService: UbicacionesService) {  }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.exito = null;
            this.ubicacion.codigo="";
            this.ubicacion.nombre="";
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.exito = null;
            this.ubicacion.codigo="";
            this.ubicacion.nombre="";
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
        this.ubicacion=new Ubicacion("","",0,0);
    }

    onSubmit(){
        // this.ubicacionesService.add(this.ubicacion.clone()).subscribe(
        //     response=>{
        //         console.log(response);
        //         if(response.status == "exito"){
        //             this.ubicaciones.push(this.ubicacion.clone());
        //             this.exito=true;
        //         }else{
        //             this.exito=false;
        //         }
        //     },
        //     error=>{
        //         if(error!=null) {
        //             console.log("Error al enviar la peticion: "+error);
        //         }
        //     }
        // );
        
        //borrar las siguientes lineas cuando este la api
        this.ubicaciones.push(this.ubicacion.clone());
        this.exito=true;
    }

    clear(){
        this.ubicacion.codigo="";
        this.ubicacion.nombre="";
        this.ubicacion.numero=0;
        this.ubicacion.nivel=0;
        this.exito=null;
    }

}
