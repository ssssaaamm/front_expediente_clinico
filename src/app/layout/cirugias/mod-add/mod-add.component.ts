import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Cirugia } from '../../../models/cirugia';
import { CirugiasService } from '../../../services/cirugias.service';

@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
  providers: [ CirugiasService ]
})
export class ModAddComponent implements OnInit {

   @Input() public cirugias: Array<Cirugia>;
    public cirugia: Cirugia;
    public exito: boolean;
    closeResult: string;
  
    constructor(private modalService: NgbModal, private cirugiasService: CirugiasService) {  }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.exito = null;
            this.cirugia.codigo="";
            this.cirugia.nombre="";
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.exito = null;
            this.cirugia.codigo="";
            this.cirugia.nombre="";
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
        this.cirugia=new Cirugia("","",0.0);
    }

    onSubmit(){
        // this.cirugiasService.add(this.cirugia.clone()).subscribe(
        //     response=>{
        //         console.log(response);
        //         if(response.status == "exito"){
        //             this.cirugias.push(this.cirugia.clone());
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
        this.cirugias.push(this.cirugia.clone());
        this.exito=true;
    }

    clear(){
        this.cirugia.codigo="";
        this.cirugia.nombre="";
        this.cirugia.costo=0.0;
        this.exito=null;
    }

}
