import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable"

@Injectable()
export class LoginService {

  //url
  public url="https://bad115.herokuapp.com";
  public identity;
  public token;
  
  //injecto la dep http
  constructor(private http:Http) { }

  signIn(user){
    //convertir el json en String
    let json=JSON.stringify(user);
    console.log("Enviando: "+json);
    let parametros="json="+json;
    //cabecera que simula formualrio normal
    let headers=new Headers({'Content-type':'application/x-www-form-urlencoded'});

    //peticion
    return this.http.post(this.url+"/login",parametros,{headers:headers}).map(res=>res.json()) ;
    // return this.http.post(this.url+"/login",parametros,{headers:headers}).map( (response: Response) => {let user=response.json();});
  }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');
        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }
}
