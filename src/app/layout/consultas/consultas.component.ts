import { Component, OnInit } from '@angular/core';
import { Consulta } from '../../models/consulta';
import { Especialidad } from '../../models/especialidad';
import { LoginService } from '../../services/login.service';
import { ConsultasService } from '../../services/consultas.service';
import { EspecialidadesService } from '../../services/especialidades.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
  providers: [ConsultasService, LoginService, EspecialidadesService]
})
export class ConsultasComponent implements OnInit {

  public consultas: Array<Consulta>=new Array<Consulta>();
  public especialidades: Array<Especialidad> = new Array<Especialidad>();

  constructor(
    private loginService: LoginService,
    private consultasService: ConsultasService,
    private especialidadesService: EspecialidadesService) { }

  ngOnInit() {

    //Obtenemos las especialidades que puedan atender una consulta
    this.especialidadesService.list()
    .map((especialidades: Array<any>)=>{
        let result: Array<Especialidad> = new Array<Especialidad>();
        // No estamos limitandonos a que solo una o algunas especialidades puedan atender una consulta
        // Si encuentra especialidades
        if(especialidades){
            especialidades.forEach((especialidad)=>{
                // Concatenamos al arreglo una entidad Especialidad contenidad dentro de la BD
                result.push(
                    new Especialidad(
                        especialidad.codigoEspecialidad,
                        especialidad.nombreEspecialidad,
                        especialidad.idEspecialidad
                ));
            });
        }
        return result;
    })
    .subscribe( res => this.especialidades = res);

    this.consultasService.list()
    .map((consultas: Array<any>)=>{
      let result: Array<Consulta> = new Array<Consulta>();
      if(consultas){
        consultas.forEach((consulta)=>{
          /*
             * Para cada consulta existente obtener los atributos correspondiente para la especialidad que atiende dicha consulta
             * Al método indexOfTipo definido más abajo le pasa los parametros de la especialidad correspondiente: (codigo, nombre,
             * idEspecialidad) para la especialidad con id = idEspecialidad que atiende la consulta
             *
             *  __________________________________________________________________
             * |             ||                          ||                       |
             * |   Método    ||     Model: Consulta      ||  Model: Especialidad  |
             * |_____________||__________________________||_______________________|
             * |             ||                          ||                       |
             * |             ||                          ||     codigo            |
             * | indexOfTipo || consulta.idEspecialidad  ||     nombre            |
             * |             ||                          ||     idEspecialidad    |
             * |_____________||__________________________||_______________________|
             *
             */
            let tipindx:number = this.indexOfEspecialidad(
                new Especialidad(
                    consulta.idEspecialidad.codigoEspecialidad, consulta.idEspecialidad.nombreEspecialidad, consulta.idEspecialidad.idEspecialidad
                ), this.especialidades);
            result.push(
                new Consulta(
                    consulta.codigoConsulta,
                    consulta.nombreConsulta,
                    consulta.costoConsulta,
                    this.especialidades[tipindx],
                    consulta.idConsulta));
        });
      }
      return result;
    })
    .subscribe( res => this.consultas = res);
  }

  private indexOfEspecialidad(especialidad:Especialidad,especialidades):number{
    let index = -1, i = 0, tam = especialidades.length;
    for(i; i<tam; i++){
        if( especialidad.id == especialidades[i].id
            && especialidad.codigo == especialidades[i].codigo
            && especialidad.nombre == especialidades[i].nombre) {
            index = i;
        }
    }
    return index;
  }

}
