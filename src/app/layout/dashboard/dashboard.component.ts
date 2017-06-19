import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {PaisesService} from 'app/services/paises.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [LoginService, PaisesService]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    
    public paises: Array<string> = [];
    public estados: Array<string> = [];
    public ciudades: Array<string> = [];
    

    constructor(private loginService:LoginService, private paisesService:PaisesService, private route:ActivatedRoute, private router:Router) {
        this.sliders.push({
            imagePath: 'assets/images/slider1.jpg',
            label: 'First slide label',
            text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
        }, {
            imagePath: 'assets/images/slider2.jpg',
            label: 'Second slide label',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }, {
            imagePath: 'assets/images/slider3.jpg',
            label: 'Third slide label',
            text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        });
        
        this.alerts.push({
            id: 1,
            type: 'success',
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`,
        }, {
            id: 2,
            type: 'danger',
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`,
        });
    }
    ngOnInit() {

        //esto deberia ir en todos los componentes en el onInit
        // let iden = this.loginService.getIdentity();
        // if(iden == null){
        //     //this.router.navigate(['/dashboard']);
        //     window.location.href = "/login"
        // }
        
        //console.log(JSON.stringify(localStorage.getItem('menus_rol')));
        //this.router.navigate(['/administracion/pacientes']);
        //generacion de script sql para paises
        //obtenemos todos los paises
        //this.cargarPaises2();
        //this.router.navigateByUrl(this.route.snapshot.queryParams['/administracion/procedimientos']);
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

       cargarPaises2(){
        //generacion de script sql para paises
        //obtenemos todos los paises
        this.paisesService.listCountries().subscribe(
            paises=>{
                let i2=0;
                let j2=0;
                let k2=0;
                paises.forEach((pais,i)=>{
                    if(pais.code=='sv'||pais.code=='gt'||pais.code=='hn'||pais.code=='bz'||pais.code=='cr'||pais.code=='pa'){
                    let sentencia="INSERT INTO pais VALUES("+(i+1)+",'"+pais.code+"','"+pais.name+"');"
                    this.paises.push(sentencia);
                    this.paisesService.listRegions(pais.code).subscribe(
                        estados=>{
                            estados.forEach((estado,j)=>{
                                let sentencia2="INSERT INTO division VALUES("+(j+1)+","+(i+1)+",'"+estado.region+"');"
                                this.estados.push(sentencia2);
                                this.paisesService.listCities(pais.code,estado.region).subscribe(
                                    ciudades=>{
                                        ciudades.forEach((ciudad,k)=>{
                                            let sentencia3="INSERT INTO subdivision VALUES("+(k+1)+","+(j+1)+",'"+ciudad.city+"');"
                                            this.ciudades.push(sentencia3);
                                        });
                                    },
                                    error=>{
                                        if(error!=null) {
                                            console.log("Error al enviar la peticion de ciudades: "+error);
                                        }
                                    }
                                );
                            });
                        },
                        error=>{
                            if(error!=null) {
                                console.log("Error al enviar la peticion de estados: "+error);
                            }
                        }
                    );
                }
                });
            },
            error=>{
                if(error!=null) {
                    console.log("Error al enviar la peticion de paises: "+error);
                }
            }
        );

        this.paisesService.listCountries().subscribe(
            paises=>{
                
            },
            error=>{
                if(error!=null) {
                    console.log("Error al enviar la peticion: "+error);
                }
            }
        );
    }

}
