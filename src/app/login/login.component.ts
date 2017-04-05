import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {NgForm} from "@angular/forms";

//para poder hacer redireccion importamos router
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    public user;
    public returnUrl: string;
    public loading = false;
    public errorMessage;
    public identity;
    public token;
    
    constructor(private loginService:LoginService, private route: ActivatedRoute, private router: Router,) { }

    ngOnInit() {
        this.user={
            "email":"fer143monster@gmail.com",
            "password":"admin123"
        };
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    login(form:NgForm){

        this.loading = true;

        this.loginService.signIn(this.user).subscribe(
        response=>{
            //alert("Respuesta del Servidor :");
            //console.log("Respuesta del servidor: "+JSON.stringify(response) );
            //this.router.navigate([this.returnUrl]);
            
            let identity = response;
            this.identity = identity;

            if(identity.length <= 0){
                //el identity viene mal
                alert("Error en el servidor, token.length <= 0");
            }else{
                if(!identity.status){//si no viene el estatus el token viene bien
                    localStorage.setItem( 'identity', JSON.stringify(identity) );
                     
                     //OBTENIENDO TOKEN
                     this.user.getHash = "true";
                     this.loginService.signIn(this.user).subscribe(
                        response=>{
                            let token = response;
                            this.token = token;

                            if(token.length <= 0){
                                alert("Error en el servidor, token.length <= 0");
                            }else{
                                if(!token.status){
                                    localStorage.setItem('token',JSON.stringify(token));
                                    
                                    console.log(this.loginService.getIdentity());
                                    console.log(this.loginService.getToken());

                                    this.router.navigate(['/dashboard']);
                                }
                            }

                        },
                        error=>{
                            this.errorMessage=<any>error;
                            if(this.errorMessage!=null) {
                                console.log("Error en la peticion: "+this.errorMessage);
                                this.loading = false;
                            }
                        }
                     );
                }
            }
        },
        error=>{
          this.errorMessage=<any>error;
          //si hay error
          if(this.errorMessage!=null) {
            console.log("Error en la peticion: "+this.errorMessage);
            this.loading = false;
          }
        }
    );
  }

    
}
