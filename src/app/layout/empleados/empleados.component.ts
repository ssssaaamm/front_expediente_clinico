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
import { DiasService } from "app/services/dias.service";
import { RolesService } from "app/services/roles.service";
import { Jornada } from "app/models/jornada";
import { Turno } from "app/models/turno";
import { Dia } from "app/models/dia";


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
  providers: [EspecialidadesService,EmpleadosService, UsuariosService,PaisesService,RolesService,DiasService]
})
export class EmpleadosComponent implements OnInit {

  public empleados: Array<Empleado> = new Array<Empleado>();
  public usuarios: Array<Usuario> = new Array<Usuario>();
  public paises:Array<any>=new Array<any>();//<--sera pasado al componente add y edit
  public dias:Array<Dia>=new Array<Dia>();//<--sera pasado al componente add y edit
  public especialidades:Array<any>= Array<any>();
  public roles:Array<any>= Array<any>();
  constructor(private empleadosService: EmpleadosService, private usuariosService: UsuariosService, private paisesService: PaisesService, private especialidadesService: EspecialidadesService, private rolesService: RolesService,private diasService:DiasService) { }

  ngOnInit() {
    /**
     * Obtener los usuarios
     */
//obteniendo las especialidades y roles momentaneamente
//  this.especialidades.push(
//       new Especialidad('01', 'Urologo', 1),
//       new Especialidad('02', 'Cardiologo', 2),
//       new Especialidad('03', 'Pediatra', 3),
//       new Especialidad('04', 'Ginecologo', 4),
//       new Especialidad('05', 'Obstetra', 5),
//     );

    //obtener los dias

    this.empleadosService.list()
      .map((empleados: Array<any>) => {
        let result: Array<Empleado> = new Array<Empleado>();
        if (empleados) {
          empleados.forEach((empleado) => {
            //let userindx:number = this.indexOfUsuario

             result.push(new Empleado(
              
              empleado.documentoUnico,
              empleado.genero,
              empleado.nombre1,
              empleado.nombre2,
              empleado.apellido1,
              empleado.apellido2,
              empleado.apellidoCasada, 
              empleado.idSubdivision,
              empleado.telFijo,
              empleado.telMovil,
              empleado.email,
              new Usuario(
                empleado.idUsuario.username,
                empleado.idUsuario.password,
                empleado.idUsuario.estado,
                null,
                empleado.idUsuario.idUsuario), /*Habra q consultar los roles*/
              null, /*No sabemos si es un medico, hasta q nos manden confirmación de la API*/
              empleado.idEmpleado

            ));
          });
        }
        return result;
      }).subscribe(res => this.empleados = res);
   
    // console.log(JSON.stringify(new Empleado("","", "", "", "", "", "", "", "", "", "",
    //   new Usuario("", "", true, new Rol("", "", 0), 0),
    //   new Medico(new Array<Especialidad>(),new Array <Jornada>(),"",0),0)));
      

    // console.log(JSON.stringify(new Empleado("","", "", "", "", "", "", "", "", "", "",
    //   new Usuario("", "", true, new Rol("", "", 0), 0),
    //   null,0))); 
  
     //obtenemos todos los paises
    this.paisesService.listCountries2()
    .map((paises: Array<any>)=>{
      return paises;
    })
    .subscribe( res => this.paises=res);

    // vamos obtenemos todos las especialidades
       this.especialidadesService.list()
    .map((especialidades: Array<any>)=>{
      let result: Array<Especialidad> = new Array<Especialidad>();
      if(especialidades){
        especialidades.forEach((especialidad)=>{
          result.push(new Especialidad(especialidad.codigoEspecialidad,especialidad.nombreEspecialidad,especialidad.idEspecialidad));
        });
      }
      return result;
    })
    .subscribe( res => this.especialidades = res);


    // obtenemos los roles
    this.rolesService.list()
    .map((roles: Array<any>)=>{
        let result: Array<Rol> = new Array<Rol>();
         if(roles){
             roles.forEach((rol)=>{
                 result.push(new Rol(
                     rol.nombreRol,
                     rol.descripcionRol,
                     rol.idRol,
                 ));
             });
         }
         return result;
     })
     .subscribe( res => this.roles = res);

  }

}