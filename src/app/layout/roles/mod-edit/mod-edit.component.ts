import { Component, OnInit, Input } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { Rol } from 'app/models/rol';
import { RolesService } from 'app/services/roles.service';

@Component({
  selector: 'app-mod-edit',
  templateUrl: './mod-edit.component.html',
  styleUrls: ['./mod-edit.component.scss'],
  providers: [RolesService]
})
export class ModEditComponent implements OnInit {

    @Input() public rol_original: Rol;
    @Input() public roles: Array<Rol>;
    
    public exito: boolean;
    public mensaje: string;
    public rol_modificado: Rol;
     public maskNames = [/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,/^[a-zA-Z]+$/,];


  closeResult: string;
  constructor(private modalService: NgbModal, private rolesService: RolesService) {  }

  ngOnInit() {
      this.rol_modificado = this.rol_original.clone();
  }

  open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          this.rol_modificado = this.rol_original.clone();
          this.exito = null;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.rol_modificado = this.rol_original.clone();
          this.exito = null;
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
      this.rolesService.edit(this.rol_modificado.clone()).subscribe(
          response=>{
              console.log(response);
              if(response.status == "exito"){
                  let pos = this.roles.indexOf(this.rol_original);
                  this.roles[pos]=this.rol_modificado.clone();
                  this.rol_original=this.roles[pos];
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

      //borrar estas lineas cuando este lista la apilet pos = this.cirugias.indexOf(this.cirugia_original);
    //   let pos = this.roles.indexOf(this.rol_original);
    //   this.roles[pos]=this.rol_modificado.clone();
    //   this.rol_original=this.roles[pos];
    //   this.exito=true;
  }

}
