import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Empleado } from "app/models/empleado";
import {EmpleadosService} from "app/services/empleados.service";
import {Usuario} from "app/models/usuario"
import{Medico} from "app/models/medico"
@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss'],
  providers: [EmpleadosService]
})
export class ModEditComponent implements OnInit {
@Input() public empleados: Array<Empleado>;
@Input() public empleado_original: Empleado; 
@Input() public medico: Medico;
empleado_modificado: Empleado;



public exito: boolean;
closeResult: string;
  constructor(private modalService: NgbModal, private empleadosService: EmpleadosService) { }

  ngOnInit() {
    this.empleado_modificado=this.empleado_original.clone();
  }
  open(content){
     this.modalService.open(content ,{size:'lg'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          //let espe=this.empleado_original.medico.especialidad;
          this.empleado_modificado = this.empleado_original.clone();
          //prueba
          //this.empleado_modificado.medico.especialidad=espe;    
          this.exito = null;
         },(reason) => {
           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.empleado_modificado = this.empleado_original.clone();
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
    this.empleadosService.edit(this.empleado_modificado.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status == "exito"){
                    /*this.empleado_original = this.empleado_modificado;
                    this.empleado_modificado = this.empleado_original.clone();*/

                    let pos = this.empleados.indexOf(this.empleado_original);
                    this.empleados[pos]=this.empleado_modificado.clone();
                    //this.empleados[pos].usuario=this.empleado_modificado.usuario;
                    //this.empleados[pos].medico=this.empleado_modificado.medico;
                    //this.empleados[pos].pais=this.empleado_modificado.pais;
                    //this.empleado_original=this.empleados[pos];
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
  }
}

