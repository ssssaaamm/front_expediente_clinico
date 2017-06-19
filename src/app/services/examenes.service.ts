import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

import { LoginService } from './login.service';
import { Examen } from '../models/examen';

@Injectable()
export class ExamenesService {

 private url="https://bad115.herokuapp.com";
  private resource: string ;
  private action: string ;
  private headers: Headers;
  public lista: Array<Examen> = new Array<Examen>();

   private token: string;

    constructor(private loginService: LoginService, private http: Http) {
    this.resource = "/examenes";
    this.headers = new Headers({'Content-type':'application/x-www-form-urlencoded'});
    this.token = this.loginService.getToken();

}

    list(){
        this.action = "/list";
        let parametros="token="+this.token;

        return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers})
        .map(
          (res) => { 
            return res.json(); 
        });

  }
  add(medicamento:Examen){
    this.action = "/add";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(medicamento);
    console.log("parametros: "+parametros);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  edit(medicamento:Examen){
    this.action = "/edit";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(medicamento);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }

  del(medicamento:Examen){
    this.action = "/del";
    let parametros="token="+this.token;
    parametros = parametros + "&json="+JSON.stringify(medicamento);

    //peticion
    return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ; 
  }
detail(examen:any){
  this.action = "/asignados";
  let parametros="token="+this.token;
  parametros = parametros + "&json="+JSON.stringify(examen);
  return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ;
}

examenPaciente(exPaciente:any){
  this.action = "/as_examenes/listExpediente";
  let parametros="token="+this.token;
  parametros = parametros + "&json="+JSON.stringify(exPaciente);
  return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ;

}
asignarExamen(exPac:any){

  
}


}
