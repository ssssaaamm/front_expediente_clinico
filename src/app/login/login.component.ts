import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {NgForm} from "@angular/forms";

// import { 
//     Event as RouterEvent,
//     NavigationStart,
//     NavigationEnd,
//     NavigationCancel,
//     NavigationError
//  } from '@angular/router';

//para poder hacer redireccion importamos router
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    private user;

    private identity;
    private token;

    private failed_login =  false;

    private loading = false;

    
    
    constructor(private loginService:LoginService, private route: ActivatedRoute, private router: Router,) { }

    ngOnInit() {
        this.user={
            "email":"fer143monster@gmail.com",
            "password":"admin123"
        };
    }

    login(form:NgForm){

        this.loading = true;

        this.loginService.signIn(this.user).subscribe(
        response=>{
            
            if(response.status=="error"){ //usuario invalido
                
                //mostrar errores
                this.failed_login=true;

                this.loading = false;
            }else{ //usuario valido
                
                if(response.id){

                    //guardamos la identidad
                    this.identity = response;

                    //obtenemos token
                    this.user.getHash = "true";
                     this.loginService.signIn(this.user).subscribe(
                        response=>{
                            
                            if(response.length <= 0){
                                //error, el servidor esta devolviendo token nulo para usuario valido
                                alert("Error en el servidor, token.length <= 0");
                            }else{
                                if(!response.status){
                                    this.token = response;
                                    
                                    //ahora que tenemos identidad y toquen si podemos guardar
                                    localStorage.setItem('token',JSON.stringify(response));
                                    localStorage.setItem( 'identity', JSON.stringify(this.identity) );

                                    console.log(this.loginService.getIdentity());
                                    console.log(this.loginService.getToken());

                                    this.router.navigate(['/dashboard']);
                                }
                            }

                        },
                        error=>{
                            if(error!=null) {
                                alert("Error a hacer la peticion"+ error);
                                console.log("Error en la peticion: "+error);
                                this.loading = false;
                            }
                        }
                     );

                }
            }
        },
        error=>{
          //si hay error
          if(error!=null) {
            console.log("Error al enviar la peticion: "+error);
            this.loading = false;
          }
        }
    );
}

    // navigationInterceptor(event: RouterEvent): void {
    //     if (event instanceof NavigationStart) {
    //         this.loading = true;
    //     }
    //     if (event instanceof NavigationEnd) {
    //         this.loading = false;
    //     }

    //     // Set loading state to false in both of the below events to hide the spinner in case a request fails
    //     if (event instanceof NavigationCancel) {
    //         this.loading = false;
    //     }
    //     if (event instanceof NavigationError) {
    //         this.loading = false;
    //     }
    // }

    
}
