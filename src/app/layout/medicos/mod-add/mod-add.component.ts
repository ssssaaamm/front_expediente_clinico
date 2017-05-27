import { Component, OnInit, Input } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {Medico} from "app/models/medico";
import {Usuario} from "app/models/usuario";
import {Rol} from "app/models/rol";

import {Especialidad} from "app/models/especialidad";
import {MedicosService} from "app/services/medicos.service";



@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
  providers:[MedicosService],
})
export class ModAddComponent implements OnInit {
@Input() public medicos: Array<Medico>;
@Input() public usuarios: Array<Usuario>;
@Input() public especialidades: Array<Especialidad>;
@Input() public paises: Array<string>;
public medico: Medico;
public exito: Boolean;
public mensaje: string;

closeResult: string;


  constructor(private modalService: NgbModal, private medicosService: MedicosService) { 
  }

  open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          this.exito = null;
          this.clear();
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.exito= null;
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

      this.medico=new Medico(new Especialidad("","",null),new Usuario(null,"","","","","","","","","","","","","",new Rol("","",null)),null);
      console.log(JSON.stringify(this.paises));
}
    onSubmit(){ 
        /**this.medicosService.add(this.medico.clone()).subscribe(
            response=>{
                console.log(response);
                if(response.status=="exito"){
                    this.medico.id=response.id;
                    this.medicos.push(this.medico.clone());
                    this.exito=true;
                    this.mensaje=response.mensaje;
                }
                else{
                    this.exito=false;
                    this.mensaje=response.mensaje;
                }
            },
            error=>{
                if(error!=null){
                    console.log("Error al enviar la petición: "+error);                    
                }
            }
        )*/
        //borrar las siguientes lineas cuando este la api
         this.medicos.push(this.medico.clone());
        this.exito=true;
    }
  
clear(){
      
      this.medico=new Medico(new Especialidad("","",null),new Usuario(null,"","","","","","","","","","","","","",new Rol("","",null)),null)
      

    }
}
