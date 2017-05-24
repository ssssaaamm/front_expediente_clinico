import { Component, OnInit, Input } from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { Rol } from 'app/models/rol';
import { RolesService } from 'app/services/roles.service';

@Component({
  selector: 'app-mod-del',
  templateUrl: './mod-del.component.html',
  styleUrls: ['./mod-del.component.scss'],
  providers: [RolesService]
})
export class ModDelComponent implements OnInit {
    
    @Input() rol: Rol;
    @Input() roles: Array<Rol>;
    public exito: boolean;
    public mensaje: string;

  closeResult: string;
  constructor(private modalService: NgbModal, private rolesService: RolesService) { }

  open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
      
  }

  onSubmit(){
    // this.rolesService.del(this.rol.clone()).subscribe(
    //     response=>{
    //         console.log(response);
    //         if(response.status == "exito"){
    //             let pos = this.roles.indexOf(this.rol);
    //             this.roles.splice(pos,1);
    //             this.exito=true;
    //             this.mensaje=response.mensaje;
    //         }else{
    //             this.exito=false;
    //             this.mensaje=response.mensaje;
    //         }
    //     },
    //     error=>{
    //         if(error!=null) {
    //             console.log("Error al enviar la peticion: "+error);
    //         }
    //     }
    // );


    //borrar las siguientes lineas cuando este lista la api
    let pos = this.roles.indexOf(this.rol);
    this.roles.splice(pos,1);
    this.exito=true;
  }

}
