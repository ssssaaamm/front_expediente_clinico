import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from "app/services/empleados.service";
import { UsuariosService } from "app/services/usuarios.service";

import {Empleado} from "app/models/empleado";
import {Usuario} from "app/models/usuario";
import {Rol} from "app/models/rol";
import {Medico} from "app/models/medico";
import {Especialidad} from "app/models/especialidad";
import { PaisesService } from "app/services/paises.service";
import { EspecialidadesService } from "app/services/especialidades.service";
import { RolesService } from "app/services/roles.service";


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
  providers: [EspecialidadesService,EmpleadosService, UsuariosService,PaisesService,RolesService]
})
export class EmpleadosComponent implements OnInit {

  public empleados: Array<Empleado> = new Array<Empleado>();
  public usuarios: Array<Usuario> = new Array<Usuario>();
  public paises:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  public especialidades:Array<any>= Array<any>();
  public roles:Array<any>= Array<any>();
  constructor(private empleadosService: EmpleadosService, private usuariosService: UsuariosService, private paisesService: PaisesService, private especialidadesService: EspecialidadesService, private rolesService: RolesService) { }

  ngOnInit() {
    /**
     * Obtener los usuarios
     */
//obteniendo las especialidades y roles momentaneamente
 this.especialidades.push(
      new Especialidad('01', 'Urologo', 1),
      new Especialidad('02', 'Cardiologo', 2),
      new Especialidad('03', 'Pediatra', 3),
      new Especialidad('04', 'Ginecologo', 4),
      new Especialidad('05', 'Obstetra', 5),
    );
     this.roles.push(
      new Rol('Medico', 'Medico', 1),
      new Rol('Administrador', 'Administrador', 2),
      new Rol('Recepcionista', 'Recepcionista', 2),
      new Rol('Enfermer@', 'Enfermer@', 3),
      new Rol('Laboratorista', 'Laboratorista', 4),
      new Rol('Fisioterapeuta', 'Fisioterapeuta', 5),
    );
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
  
     //obtenemos todos los paises
    this.paisesService.listCountries()
    .map((paises: Array<any>)=>{
      return paises;
    })
    .subscribe( res => this.paises=res);

    // vamos obtenemos todos las especialidades
    /*this.especialidadesService.listEs()
    .map((paises: Array<any>)=>{
      return paises;
    })
    .subscribe( res => this.paises=res);
*/

  }

}