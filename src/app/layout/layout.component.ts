import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { 
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
 } from '@angular/router';
import { MenuRol } from "app/models/menu_rol";
import { Menu } from "app/models/menu";
import { RolesService } from "app/services/roles.service";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers: [RolesService]
})
export class LayoutComponent implements OnInit {
    loading: boolean = true;
    public menus_rol = new Array<MenuRol>();
    public menu_rol:MenuRol;


    constructor(private rolesService: RolesService,public router: Router) {

        router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });

    }

    ngOnInit() {

        //inicialmente redirijo al dashboard, pero se debe redireccionar al primer elemento del menu
        if (this.router.url === '/') {
            // this.router.navigate(['/dashboard']);
            //this.router.navigate(['/'+this.menu_rol.menu.url]);
            this.cargarMenu();
        }

    }


    private cargarMenu() {


        this.rolesService.getPrivilegiosUsuario().subscribe(
            response=>{
                console.log(response);
                this.menu_rol=new MenuRol(
                    response[0].orden,
                    response[0].list,
                    response[0].add,
                    response[0].edit,
                    response[0].del,
                    new Menu(
                        response[0].idMenu.iconoMenu,
                        response[0].idMenu.accionMenu,
                        response[0].idMenu.urlMenu,
                        response[0].idMenu.recurso,
                        response[0].idMenu.idMenu
                    ),
                    null, //este tambien puede dejarse a null 
                    response[0].idPrivilegios //importante que este no se deje a null       
                )
                this.router.navigate(['/'+this.menu_rol.menu.url]);
            },
            error=>{
                if(error!=null) {
                    console.log("Error al enviar la peticion: "+error);
                }
            }
        );

        // this.menus_rol = new Array<MenuRol>();
        // //solicitar los menus_rol para el rol indicado este bloque debe agregarse al momento en que se abre el modal
        // this.rolesService.getPrivilegiosUsuario()
        //     .map((menus_role: Array<any>) => {
        //         let result: Array<MenuRol> = new Array<MenuRol>();
        //         if (menus_role) {
        //             console.log(JSON.stringify(menus_role));
        //             menus_role.forEach((menu_rol) => {
        //                 result.push(
        //                     new MenuRol(
        //                         menu_rol.orden,
        //                         menu_rol.list,
        //                         menu_rol.add,
        //                         menu_rol.edit,
        //                         menu_rol.del,
        //                         new Menu(
        //                             menu_rol.idMenu.iconoMenu,
        //                             menu_rol.idMenu.accionMenu,
        //                             menu_rol.idMenu.urlMenu,
        //                             menu_rol.idMenu.recurso,
        //                             menu_rol.idMenu.idMenu
        //                         ),
        //                         null, //este tambien puede dejarse a null 
        //                         menu_rol.idPrivilegios //importante que este no se deje a null       
        //                     )
        //                 );
        //             });
        //         }
        //         return result;
        //     })
        //     .subscribe(res => this.menus_rol = res);



        //     localStorage.setItem('menus_rol', JSON.stringify(this.menus_rol));
            //console.log(JSON.stringify(localStorage.getItem('menus_rol')));
            //this.router.navigate([this.menus_rol[0].menu.url]);
            

    }

    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd) {
            this.loading = false;
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof NavigationError) {
            this.loading = false;
        }
    }
}
