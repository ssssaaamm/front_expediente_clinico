import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import { LoginService } from './login.service';
@Injectable()
export class CitasService {
 private url="https://bad115.herokuapp.com";
  private resource: string ;
  private action: string ;
  private headers: Headers;

   private token: string;
 
    constructor(private loginService: LoginService, private http: Http) {
    this.resource = "/citas";
    this.headers = new Headers({'Content-type':'application/x-www-form-urlencoded'});
    this.token = this.loginService.getToken();

}

detail(cita:any){
  this.action = "/asignados";
  let parametros="token="+this.token;
  parametros = parametros + "&json="+JSON.stringify(cita);
  return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ;


}
listCitas(pacientej:any){
  this.action = "/asignadas";
  let parametros="token="+this.token;
  parametros = parametros + "&json="+JSON.stringify(pacientej);
  return this.http.post(this.url+this.resource+this.action,parametros,{headers:this.headers}).map(res=>res.json()) ;
}
}
