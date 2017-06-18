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

 public asignacion_consulta: Array<any>;

  public exito: boolean;
  public mensaje: string;
  closeResult: string;

  constructor(
    private loginService: LoginService,
    private consultasService: ConsultasService,
    private especialidadesService: EspecialidadesService) { }

  ngOnInit() {

    let identidad = JSON.parse(localStorage.getItem("identity"));

    console.log("ENVIANDO IDENTIDAD: " + JSON.stringify(identidad));
     this.consultasService.detail(identidad).subscribe(
            response=>{
                console.log(response);
               this.asignacion_consulta = response;
            },
            error=>{
                if(error!=null) {
                    console.log("Error al enviar la peticion: "+error);
                }
            }
        );
  }

}
