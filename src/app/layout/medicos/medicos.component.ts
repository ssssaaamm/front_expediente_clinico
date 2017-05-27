import { Component, OnInit } from '@angular/core';
import { MedicosService } from "app/services/medicos.service";
import { EspecialidadesService } from "app/services/especialidades.service";
import { UsuariosService } from "app/services/usuarios.service";
import {LoginService} from "app/services/login.service"
import {Medico} from "app/models/medico";
import {Rol} from "app/models/rol";
import {Especialidad} from "app/models/especialidad";
import {Usuario} from "app/models/usuario";
import {PaisesService} from "app/services/paises.service";

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss'],
    providers: [MedicosService,EspecialidadesService,UsuariosService,LoginService,PaisesService] 
})
export class MedicosComponent implements OnInit {

public medicos : Array<Medico>= new Array<Medico>();
public especialidades : Array <Especialidad> = new Array<Especialidad>();
public paises: Array<string>=new Array<string>();
/**Si es para lo q me imagino creo q no es necesario este Array pero por si acaso */
//public usuarios : Array <Usuario> = new Array<Usuario>();
  constructor(private loginService : LoginService,private medicosService : MedicosService, private especialidadesService : EspecialidadesService,private usuariosService : UsuariosService,private paisesService:PaisesService) { }

  ngOnInit() {
 /** Obtener especialidades*/
 this.especialidadesService.list()
 .map((especialidades:Array<any>)=>{
   let result: Array<Especialidad>= new Array<Especialidad>();
   if(especialidades){
      especialidades.forEach((especialidad)=>{
        result.push(new Especialidad(
          especialidad.codigoEspecialidad,
          especialidad.nombreEspecialidad,
          especialidad.idEspecialidad

        ));
      });
   }
   return result;
 })
 .subscribe(res => this.especialidades=res);


  /** Obtener Medicos*/
 this.medicosService.list()
 .map((medicos:Array<any>)=>{
   let result: Array<Medico>= new Array<Medico>();
   if(medicos){
      medicos.forEach((medico)=>{
        let espeindx:number = this.indexOfEspecialidad(new Especialidad(medico.especialidad.codigo,medico.especialidad.nombre,medico.especialidad.id),this.especialidades);
        
        result.push(new Medico(
         this.especialidades[espeindx],
         new Usuario(
           medico.idUsuario.id,
           medico.idUsuario.nombre1,
           medico.idUsuario.nombre2,
           medico.idUsuario.apellido1,
           medico.idUsuario.apellido2,
           medico.idUsuario.apellido_casada,
           medico.idUsuario.pais,
           medico.idUsuario.division,
           medico.idUsuario.subdivision,
           medico.idUsuario.tel_fijo,
           medico.idUsuario.tel_movil,
           medico.idUsuario.email,
           medico.idUsuario.username,
           medico.idUsuario.password,
           new Rol(medico.idUsuario.idRol.nombre,medico.idUsuario.idRol.descripcion,medico.idUsuario.idRol.id)
        ),
        medico.idMedico));
      });
   }
   return result;
 }).subscribe(res => this.medicos=res);
    /**
     * Obteniendo paises
     */
    this.paisesService.list()
        .map((paises:Array<any>)=>{
        let result: Array<string>= new Array<string>();
        if(paises){
            paises.forEach((pais)=>{
                result.push(
                JSON.stringify(pais.countryname)     
                );
            });
        }
        return result;
        })
        .subscribe(res => this.paises=res);
}
  private indexOfEspecialidad(especialidad:Especialidad,especialidades):number{
    let index=-1,i=0,tam=especialidades.length;
    for(i;i<tam;i++){
        if(especialidad.id==especialidades[i].id && especialidad.nombre==especialidades[i].nombre && especialidad.codigo==especialidades[i].codigo){
            index=i;
        }
    }
    return index;
  }

}
