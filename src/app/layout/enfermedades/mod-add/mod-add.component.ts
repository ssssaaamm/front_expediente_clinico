import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Enfermedad } from '../../../models/enfermedad';
import { EnfermedadesService } from '../../../services/enfermedades.service';

@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
  providers: [ EnfermedadesService ]
})
export class ModAddComponent implements OnInit {

  @Input() public enfermedades: Array<Enfermedad>;
    public enfermedad: Enfermedad;
    public exito: boolean;
    public mensaje: string;
    closeResult: string;
  
    constructor(private modalService: NgbModal, private enfermedadesService: EnfermedadesService) {  }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.exito = null;
            this.enfermedad.codigo="";
            this.enfermedad.nombre="";
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.exito = null;
            this.enfermedad.codigo="";
            this.enfermedad.nombre="";
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
        this.enfermedad=new Enfermedad("","");
    }

    onSubmit(){
this.enfermedadesService.add(this.enfermedad.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    this.enfermedad.id=response.id;
                    this.enfermedades.push(this.enfermedad.clone());
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
        
    }

    clear(){
        this.enfermedad.codigo="";
        this.enfermedad.nombre="";
        this.exito=null;
    }

}
