import { Component, OnInit } from '@angular/core';
import {Menu} from 'app/models/menu';
import {Rol} from 'app/models/rol';
import {MenuRol} from 'app/models/menu_rol';
import {RolesService} from 'app/services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [RolesService]
})
export class RolesComponent implements OnInit {

  public roles: Array<Rol>=new Array<Rol>();

  constructor(private rolesService: RolesService) { }

  ngOnInit() {

    //obtenemos los roles
    // this.rolesService.list()
    // .map((roles: Array<any>)=>{
    //     let result: Array<Rol> = new Array<Rol>();
    //     if(roles){
    //         roles.forEach((rol)=>{
    //             result.push(new Rol(
    //                 rol.codigoEspecialidad,
    //                 rol.nombreEspecialidad,
    //                 rol.idEspecialidad
    //             ));
    //         });
    //     }
    //     return result;
    // })
    // .subscribe( res => this.roles = res);

    //borrar las siguientes lineas cuando este la api
    this.roles.push(
      new Rol('Administrador','Administra el sistema',1),
      new Rol('Laboratorista','Gestiona examenes',2),
      new Rol('Fisioterapista','Brinda consulta y fisioterapias',3),
    );

  }

}
