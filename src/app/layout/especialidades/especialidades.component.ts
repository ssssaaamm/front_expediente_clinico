import { Component, OnInit } from '@angular/core';
import { Especialidad } from '../../models/especialidad';
import { LoginService } from '../../services/login.service';
import { EspecialidadesService } from '../../services/especialidades.service';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss'],
  providers: [EspecialidadesService, LoginService]
})
export class EspecialidadesComponent implements OnInit {

  public especialidades: Array<Especialidad>;

  constructor(private loginService: LoginService, private especialidadesService: EspecialidadesService) { 

  }

  ngOnInit() {
    this.especialidadesService.list()
    .map((especialidades: Array<any>)=>{
      let result: Array<Especialidad> = new Array<Especialidad>();
      if(especialidades){
        especialidades.forEach((especialidad)=>{
          result.push(new Especialidad(especialidad.codigo_especialidad,especialidad.nombre_especialidad,especialidad.id_especialidad));
        });
      }
      return result;
    })
    .subscribe( res => this.especialidades = res);
  }

}
