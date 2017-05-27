import { Component, OnInit, Input } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {Medico} from "app/models/medico";
import {Usuario} from "app/models/usuario";
import {Especialidad} from "app/models/especialidad";
import {MedicosService} from "app/services/medicos.service";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss']
})
export class ModEditComponent implements OnInit {
@Input() public medicos: Array<Medico>;
@Input() public medico_original: Medico;
@Input() public usuarios: Array<Usuario>;
@Input() public especialidades: Array<Especialidad>;
public medico_modificado: Medico;
public exito: Boolean;
public mensaje: string;
closeResult: string;
  constructor(private modalService: NgbModal, private medicosService: MedicosService) { 

}


    ngOnInit() {
        //rellena los campos con los valores segun el usuario a editar
        let user=this.medico_original.usuario;
        this.medico_modificado = this.medico_original.clone();
        this.medico_modificado.usuario=user; //el tipo no lo tenemos que clonar  
  
        //rellena los campos con los valores segun la especialidad a editar
        let espe=this.medico_original.especialidad;
        this.medico_modificado = this.medico_original.clone();
        this.medico_modificado.especialidad=espe; //el tipo no lo tenemos que clonar  
    
   }
open(content){
  this.modalService.open(content).result.then((result) =>{
    this.closeResult = `Closed with: ${result}`;
    let user=this.medico_original.usuario;
    let espe=this.medico_original.especialidad;
    this.medico_modificado=this.medico_original.clone();
    this.medico_modificado.usuario=user;
    this.medico_modificado.especialidad=espe;
    this.exito=null;
  }, (reason) =>{
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

  })

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
    this.medicosService.edit(this.medico_modificado.clone()).subscribe(
    response => {
      console.log(response);
      if(response.status=="exito"){
       this.medico_original = this.medico_modificado;
                    this.medico_modificado = this.medico_original.clone();
          let pos = this.medicos.indexOf(this.medico_original);
          this.medicos[pos]=this.medico_modificado.clone();
          //this.medicos[pos].usuario=this.medico_modificado.usuario;
          this.medicos[pos].especialidad=this.medico_modificado.especialidad;
          this.medico_original=this.medico_modificado[pos];
          this.exito=true;
          this.mensaje=response.mensaje;  
        }else{
          this.exito=false;
          this.mensaje=response.mensaje;
        }
      },
        error=>{
          if(error!=null){
            console.log("error en la petición: "+error)
          }
        }
    );
            //borrar estas lineas cuando este lista la api
        
         let pos = this.medicos.indexOf(this.medico_original);
         this.medicos[pos]=this.medico_modificado.clone();
         this.medico_original=this.medicos[pos];
         this.exito=true;
  }
}
