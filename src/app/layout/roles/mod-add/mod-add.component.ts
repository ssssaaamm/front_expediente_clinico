import { Component, OnInit, Input } from '@angular/core';
import { NgbModal,ModalDismissReasons, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

import {Rol} from 'app/models/rol';
import {RolesService} from 'app/services/roles.service';

@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrls: ['./mod-add.component.scss'],
  providers: [RolesService]
})
export class ModAddComponent implements OnInit {


    @Input() roles: Array<Rol>;
    public rol: Rol;
    public exito: boolean;
    public mensaje:string;
    closeResult: string;

    constructor(private modalService: NgbModal, private rolesService: RolesService) { 
        //iniciamos un nuevo rol en blanco.
        this.rol=new Rol('','',null)
     }

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
    }

    onSubmit(){
        //aqui simplemente se crearan los roles sin permisos
        // this.rolesService.add(this.rol.clone()).subscribe(
        //     response=>{
        //         console.log(response);
        //         if(response.status == "exito"){
        //             this.rol.id=response.id;
        //             this.roles.push(this.rol.clone());
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

        //borrar las siguientes lineas cuando este la api
        this.roles.push(this.rol.clone());
        this.exito=true;
        
    }

    clear(){
        //limpiar el formulario de agregacion de roles
        this.rol.id=null;
        this.rol.nombre='';
        this.rol.descripcion='';
    }

}
