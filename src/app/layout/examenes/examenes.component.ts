import { Component, OnInit } from '@angular/core';
import { ExamenesService } from "app/services/examenes.service";
import { LoginService } from "app/services/login.service";
import { Examen } from "app/models/examen";

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.scss'],
  providers: [ExamenesService, LoginService]

  
})
export class ExamenesComponent implements OnInit {public examenes : Array<Examen>;

  constructor(private LoginService: LoginService, private examenesService: ExamenesService) { }

  ngOnInit() {
     this.examenesService.list()
    .map((examenes: Array<any>)=>{
      let result: Array<Examen> = new Array<Examen>();
      if(examenes){
        examenes.forEach((examen)=>{
          result.push(new Examen(examen.tipo,examen.codigo,examen.nombre,examen.id));
        });
      }
      return result;
    })
    .subscribe( res => this.examenes = res);
    
  let vec:Array<Examen> = [
    new Examen("clinico","003","espe1",200)
  ]; 
  this.examenes=vec;
  }
  }


