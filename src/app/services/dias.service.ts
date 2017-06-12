import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import { LoginService } from "app/services/login.service";

import { Dia } from "app/models/dia";

@Injectable()
export class DiasService {

 private url="https://bad115.herokuapp.com";
  private resource: string ;
  private action: string ;
  private headers: Headers;
  public lista: Array<Dia> = new Array<Dia>();

   private token: string;

    constructor(private loginService: LoginService, private http: Http) {
    this.resource = "/dias";
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
  


}

