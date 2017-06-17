import { Component, OnInit } from '@angular/core';
import { Consulta } from 'app/models/consulta';
import { Especialidad } from 'app/models/especialidad';
import { LoginService } from 'app/services/login.service';
import { ConsultasService } from 'app/services/consultas.service';
import { EspecialidadesService } from 'app/services/especialidades.service';


@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
  providers: [ConsultasService, LoginService, EspecialidadesService]

})
export class ConsultasComponent implements OnInit {

  public consultas: Array<Consulta> = new Array<Consulta>();
  public especialidades: Array<Especialidad> = new Array<Especialidad>();

  constructor(
    private loginService: LoginService,
    private consultasService: ConsultasService,
    private especialidadesService: EspecialidadesService) { }

  ngOnInit() {
  }

}
