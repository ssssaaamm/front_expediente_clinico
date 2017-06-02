import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from "app/services/empleados.service";
import { UsuariosService } from "app/services/usuarios.service";

import {Empleado} from "app/models/empleado";
import {Usuario} from "app/models/usuario";
import {Rol} from "app/models/rol";
import {Medico} from "app/models/medico";
import {Especialidad} from "app/models/especialidad";


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
  providers: [EmpleadosService, UsuariosService]
})
export class EmpleadosComponent implements OnInit {

  public empleados: Array<Empleado> = new Array<Empleado>();
  public usuarios: Array<Usuario> = new Array<Usuario>();

  constructor(private empleadosService: EmpleadosService, private usuariosService: UsuariosService) { }

  ngOnInit() {
    /**
     * Obtener los usuarios
     */

    this.empleadosService.list()
      .map((empleados: Array<any>) => {
        let result: Array<Empleado> = new Array<Empleado>();
        if (empleados) {
          empleados.forEach((empleado) => {
            //let userindx:number = this.indexOfUsuario

            result.push(new Empleado(
              empleado.dui,
              empleado.nombre1,
              empleado.nombre2,
              empleado.apellido1,
              empleado.apellido2,
              empleado.apellido_casada,
              empleado.pais,
              empleado.division,
              empleado.subdivision,
              empleado.tel_fijo,
              empleado.tel_movil,
              empleado.email,
              new Usuario(
                empleado.idUsuario.username,
                empleado.idUsuario.password,
                empleado.idUsuario.estado,
                new Rol(empleado.idRol.nombreRol, empleado.idRol.descripcionRol, empleado.idRol.idRol),
                empleado.idUsuario.id, ), /*Habra q consultar los roles*/
              null, /*No sabemos si es un medico, hasta q nos manden confirmación de la API*/
              empleado.id

            ));
          });
        }
        return result;
      }).subscribe(res => this.empleados = res);
   
    console.log(JSON.stringify(new Empleado("", "", "", "", "", "", "", "", "", "", "", "",
      new Usuario("", "", true, new Rol("", "", 0), 0),
      new Medico(new Especialidad("", "", 0), "", 0), 0)));

    console.log(JSON.stringify(new Empleado("", "", "", "", "", "", "", "", "", "", "", "",
      new Usuario("", "", true, new Rol("", "", 0), 0),
      null, 0))); 
  }

}