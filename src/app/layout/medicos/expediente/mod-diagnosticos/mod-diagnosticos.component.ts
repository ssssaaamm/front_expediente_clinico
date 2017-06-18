import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Enfermedad } from "app/models/enfermedad";
import { LoginService } from "app/services/login.service";
import { EnfermedadesService } from "app/services/enfermedades.service";

@Component({
  selector: 'app-mod-diagnosticos',
  templateUrl: './mod-diagnosticos.component.html',
  styleUrls: ['./mod-diagnosticos.component.scss'],
    providers: [EnfermedadesService, LoginService]
})
export class ModDiagnosticosComponent implements OnInit {
 
  public enfermedades: Array<Enfermedad> = new Array<Enfermedad>();

  constructor(private loginService: LoginService, private enfermedadesService: EnfermedadesService) { 

  }

  ngOnInit() {
    this.enfermedadesService.list()
    .map((enfermedades: Array<any>)=>{
      let result: Array<Enfermedad> = new Array<Enfermedad>();
      if(enfermedades){
        enfermedades.forEach((enfermedad)=>{
          result.push(new Enfermedad(enfermedad.codigoEnfermedad,enfermedad.nombreEnfermedad,enfermedad.idEnfermedad));
        });
      }
      return result;
    })
    .subscribe( res => this.enfermedades = res);
  }

}
