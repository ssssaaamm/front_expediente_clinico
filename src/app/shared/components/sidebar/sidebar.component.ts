import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolesService } from 'app/services/roles.service';
import { MenuRol } from "app/models/menu_rol";
import { Menu } from "app/models/menu";
import { Rol } from "app/models/rol";



@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [RolesService]
})
export class SidebarComponent implements OnInit {


    isActive = false;
    showMenu = '';

    public menus_rol = new Array<MenuRol>();

    constructor(private rolesService: RolesService, public router:Router) { }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    ngOnInit(): void {
        console.log('CARGANDO MENU');
        //this.cargarMenu();
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    private cargarMenu() {

        this.menus_rol = new Array<MenuRol>();
        //solicitar los menus_rol para el rol indicado este bloque debe agregarse al momento en que se abre el modal
        this.rolesService.getPrivilegiosUsuario()
            .map((menus_role: Array<any>) => {
                let result: Array<MenuRol> = new Array<MenuRol>();
                if (menus_role) {
                    console.log(JSON.stringify(menus_role));
                    menus_role.forEach((menu_rol) => {
                        result.push(
                            new MenuRol(
                                menu_rol.orden,
                                menu_rol.list,
                                menu_rol.add,
                                menu_rol.edit,
                                menu_rol.del,
                                new Menu(
                                    menu_rol.idMenu.iconoMenu,
                                    menu_rol.idMenu.accionMenu,
                                    menu_rol.idMenu.urlMenu,
                                    menu_rol.idMenu.recurso,
                                    menu_rol.idMenu.idMenu
                                ),
                                null, //este tambien puede dejarse a null 
                                menu_rol.idPrivilegios //importante que este no se deje a null       
                            )
                        );
                    });
                }
                return result;
            })
            .subscribe(res => this.menus_rol = res);

            //this.router.navigate([this.menus_rol[0].menu.url]);


            localStorage.setItem('menus_rol', JSON.stringify(this.menus_rol));

    }
}
