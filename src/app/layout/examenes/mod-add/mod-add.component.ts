import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Examen } from "app/models/examen";
import { ExamenesService } from "app/services/examenes.service";

@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss']
})
export class ModAddComponent implements OnInit {

     @Input() public examenes: Array<Examen>;
    public examen: Examen;
    public exito: boolean;
    closeResult: string;
  
  constructor(private modalService: NgbModal, private examenesService: ExamenesService) {  }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.exito = null;
            this.examen.tipo="";            
            this.examen.codigo="";
            this.examen.nombre="";
            this.examen.costo=0.0;
            
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.exito = null;
            this.examen.tipo="";                        
            this.examen.codigo="";
            this.examen.nombre="";
            this.examen.costo=0.0;
            
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
      /**muestra los campos vacios solo con el placeholder :)  */
      this.examen=new Examen("","","",0.0);
  }

      onSubmit(){
        this.examenesService.add(this.examen.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    this.examen.id=response.id;
                    this.examenes.push(this.examen.clone());
                    this.exito=true;
                }else{
                    this.exito=false;
                }
            },
            error=>{
                if(error!=null) {
                    console.log("Error al enviar la peticion: "+error);
                }
            }
        );
        
        /*borrar las siguientes lineas cuando este la api
        this.examenes.push(this.examen.clone());
        this.exito=true;
        */
    }
      clear(){
        this.examen.tipo="";                    
        this.examen.codigo="";
        this.examen.nombre="";
        this.examen.costo=0.0;        
        this.exito=null;
    }

}
