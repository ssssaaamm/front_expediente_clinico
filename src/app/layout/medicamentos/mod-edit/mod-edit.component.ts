import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Medicamento } from "app/models/medicamento";
import { TipoMedicamento } from "app/models/tipo_medicamento";
import { MedicamentosService } from "app/services/medicamentos.service";
import  createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss']
})
export class ModEditComponent implements OnInit {

  
    @Input() public medicamentos: Array<Medicamento>; 
    @Input() public medicamento_original: Medicamento;
    @Input() public tipos_medicamento: Array<TipoMedicamento>;
    public exito: boolean;
    public mensaje: string;
    medicamento_modificado: Medicamento;

    closeResult: string;
     public costoMask = createNumberMask({
        allowDecimal: true,
        prefix:false
    })

    constructor(private modalService: NgbModal, private medicamentosService: MedicamentosService) {
        
    }

    ngOnInit() {
        //rellena los campos con los valores segun el examen a editar
        let tip=this.medicamento_original.tipo;
        this.medicamento_modificado = this.medicamento_original.clone();
        this.medicamento_modificado.tipo=tip; //el tipo no lo tenemos que clonar  
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            let tip=this.medicamento_original.tipo;
            this.medicamento_modificado = this.medicamento_original.clone();
            this.medicamento_modificado.tipo=tip; //el tipo no lo tenemos que clonar   
            this.exito = null;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            let tip=this.medicamento_original.tipo;
            this.medicamento_modificado = this.medicamento_original.clone();
            this.medicamento_modificado.tipo=tip; //el tipo no lo tenemos que clonar   
            this.exito=null;
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

    onSubmit(){
        this.medicamentosService.edit(this.medicamento_modificado.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    /*this.medicamento_original = this.medicamento_modificado;
                    this.medicamento_modificado = this.medicamento_original.clone();*/
                    let pos = this.medicamentos.indexOf(this.medicamento_original);
                    this.medicamentos[pos]=this.medicamento_modificado.clone();
                    this.medicamentos[pos].tipo=this.medicamento_modificado.tipo;
                    this.medicamento_original=this.medicamentos[pos];
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

        /*borrar estas lineas cuando este lista la apilet pos = this.medicamentos.indexOf(this.medicamento_original);
         let pos = this.medicamentos.indexOf(this.medicamento_original);
         this.medicamentos[pos]=this.medicamento_modificado.clone();
         this.medicamento_original=this.medicamentos[pos];
         this.exito=true;*/
    }
}
