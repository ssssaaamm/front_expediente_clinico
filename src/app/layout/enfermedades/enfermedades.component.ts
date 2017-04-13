import { Component, OnInit } from '@angular/core';
import { Enfermedad } from '../../models/enfermedad';
import { LoginService } from '../../services/login.service';
import { EnfermedadesService } from '../../services/enfermedades.service';

@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styleUrls: ['./enfermedades.component.scss'],
  providers: [EnfermedadesService, LoginService]
})
export class EnfermedadesComponent implements OnInit {

  public enfermedades: Array<Enfermedad> = new Array<Enfermedad>();

  constructor(private loginService: LoginService, private enfermedadesService: EnfermedadesService) { 

  }

  ngOnInit() {
    this.enfermedadesService.list()
    .map((enfermedades: Array<any>)=>{
      let result: Array<Enfermedad> = new Array<Enfermedad>();
      if(enfermedades){
        enfermedades.forEach((enfermedad)=>{
          result.push(new Enfermedad(enfermedad.codigo_enfermedad,enfermedad.nombre_enfermedad,enfermedad.id_enfermedad));
        });
      }
      return result;
    })
    .subscribe( res => this.enfermedades = res);
  }

}
