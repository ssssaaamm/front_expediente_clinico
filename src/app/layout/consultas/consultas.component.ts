import { Component, OnInit } from '@angular/core';
import { Consulta } from '../../models/consulta';
import { LoginService } from '../../services/login.service';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
  providers: [ConsultasService, LoginService]
})
export class ConsultasComponent implements OnInit {

  public consultas: Array<Consulta>=new Array<Consulta>();

  constructor(private loginService: LoginService, private consultasService: ConsultasService) { 

  }

  ngOnInit() {
    this.consultasService.list()
    .map((consultas: Array<any>)=>{
      let result: Array<Consulta> = new Array<Consulta>();
      if(consultas){
        consultas.forEach((consulta)=>{
          result.push(new Consulta(consulta.codigo_consulta,consulta.nombre_consulta,consulta.costo_consulta,consulta.id_consulta));
        });
      }
      return result;
    })
    .subscribe( res => this.consultas = res);
  }

}
