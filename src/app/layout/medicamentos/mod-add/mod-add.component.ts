import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Medicamento } from "app/models/medicamento";
import { TipoMedicamento } from "app/models/tipo_medicamento";
import { MedicamentosService } from "app/services/medicamentos.service";

@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss']
})
export class ModAddComponent implements OnInit {
    @Input() public medicamentos: Array<Medicamento>;
    @Input() public tipos_medicamento: Array<TipoMedicamento>;
    public medicamento: Medicamento;
    public exito: boolean;
    public mensaje: string;
    closeResult: string;
  
  constructor(private modalService: NgbModal, private medicamentosService: MedicamentosService) { 

   }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.exito = null;
            this.medicamento.codigo="";
            this.medicamento.nombre="";
            this.medicamento.costo=0.0;
            
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.exito = null;
            this.medicamento.codigo="";
            this.medicamento.nombre="";
            this.medicamento.costo=0.0;
            
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
      this.medicamento=new Medicamento("","",new TipoMedicamento(0,0),0.0);
  }

      onSubmit(){
        this.medicamentosService.add(this.medicamento.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    this.medicamento.id=response.id;
                    this.medicamentos.push(this.medicamento.clone());
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
        
        //borrar las siguientes lineas cuando este la api
        // this.medicamentos.push(this.medicamento.clone());
        // this.exito=true;
    }
    
    clear(){
        this.medicamento.codigo="";
        this.medicamento.nombre="";
        this.medicamento.costo=0.0;        
        this.exito=null;
    }

}
