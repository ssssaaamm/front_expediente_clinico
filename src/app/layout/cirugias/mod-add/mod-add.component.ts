import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Cirugia } from '../../../models/cirugia';
import { Especialidad } from '../../../models/especialidad';
import { CirugiasService } from '../../../services/cirugias.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NG_VALIDATORS, Validator } from '@angular/forms';
@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
  providers: [ CirugiasService ]
})
export class AppComponent {
  public myModel = '';
  public costoMask = ['/^\$?[\d,]+(\.\d*)?$/'];
}
export class ModAddComponent implements OnInit {

   @Input() public cirugias: Array<Cirugia>;
   @Input() public especialidades: Array<Especialidad>;
    public cirugia: Cirugia;
    public exito: boolean;
    public mensaje: string;
    closeResult: string;
  
    constructor(private modalService: NgbModal, private cirugiasService: CirugiasService) {  }

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
         /**muestra los campos vacios solo con el placeholder :)  */
        this.cirugia=new Cirugia("","",null,new Especialidad("","",0),0);
    }

    onSubmit(){
        this.cirugiasService.add(this.cirugia.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    this.cirugia.id=response.id;
                    this.cirugias.push(this.cirugia.clone());
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
        // this.cirugias.push(this.cirugia.clone());
        // this.exito=true;
    }

    clear(){
        this.cirugia.codigo="";
        this.cirugia.nombre="";
        this.cirugia.costo=null;
        this.exito=null;
    }

 }

