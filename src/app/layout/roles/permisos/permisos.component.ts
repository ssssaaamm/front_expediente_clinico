import { Component, OnInit, Input} from '@angular/core';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {RolesService} from 'app/services/roles.service';


import {MenuRol} from 'app/models/menu_rol';
import {Rol} from 'app/models/rol';
import {Menu} from 'app/models/menu';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss'],
  providers: [RolesService]
})
export class PermisosComponent implements OnInit {

  @Input() public rol: Rol;
  public menus_rol: Array<MenuRol>=new Array<MenuRol>();

  public exito: boolean;
  public mensaje: string;

  closeResult: string;

  constructor(private modalService: NgbModal,private rolesService: RolesService) { }

  open(content) {
      this.modalService.open(content,{size:'lg'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

      this.cargarPermisos();
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
      this.rolesService.privilegiosEdit(this.menus_rol).subscribe(
          response=>{
              console.log(response);
              if(response.status == "exito"){
                  this.exito = true;
                  this.mensaje=response.mensaje;
              }else{
                  this.cargarPermisos(); //volvemos a cargar los permisos originales
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

    //Simulando error
    this.cargarPermisos();
  }

  private cargarPermisos(){
    this.menus_rol=new Array<MenuRol>();
    //solicitar los menus_rol para el rol indicado este bloque debe agregarse al momento en que se abre el modal
    this.rolesService.privilegiosList(this.rol)
    .map((menus_role: Array<any>)=>{
        let result: Array<MenuRol> = new Array<MenuRol>();
        if(menus_role){
            menus_role.forEach((menu_rol)=>{
                result.push(
                  new MenuRol(
                    menu_rol.orden, 
                    menu_rol.list, 
                    menu_rol.add, 
                    menu_rol.edit, 
                    menu_rol.del, 
                    new Menu(menu_rol.idMenu.icono,
                    menu_rol.idMenu.titulo,
                    menu_rol.idMenu.url, 
                    menu_rol.idMenu.recurso, 
                    menu_rol.idMenu.idMenu), 
                    this.rol, //este tambien puede dejarse a null 
                    menu_rol.id //importante que este no se deje a null       
                  )
                );
            });
        }
        return result;
    })
    .subscribe( res => this.menus_rol = res);

    //Borrar estas lineas cuando ya este la api
    //Aqui estamos simulando que se estan jalando los menus_rol
    // console.log("jalare los menu_rol");
    // this.menus_rol=[
    //     new MenuRol(1,true,false,true,true,new Menu('fa fa-vcard','Menu1','','',1),this.rol,1),
    //     new MenuRol(1,true,false,true,true,new Menu('fa fa-vcard','Menu2','','',1),this.rol,2),
    //     new MenuRol(1,true,false,true,true,new Menu('fa fa-vcard','Menu3','','',1),this.rol,3),
    //     new MenuRol(1,true,false,false,true,new Menu('fa fa-vcard','Menu4','','',1),this.rol,4),
    //     new MenuRol(1,true,false,true,true,new Menu('fa fa-vcard','Menu5','','',1),this.rol,5),
    //     new MenuRol(1,true,false,true,true,new Menu('fa fa-vcard','Menu6','','',1),this.rol,6)
    // ];
  }

  onChange(ver:any,menu_rol:MenuRol){
      if(ver.checked == false){
          menu_rol.add=false;
          menu_rol.edit=false;
          menu_rol.del=false;
      }
  }

}
