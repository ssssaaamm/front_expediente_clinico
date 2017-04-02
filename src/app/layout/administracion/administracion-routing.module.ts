import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {RolesComponent} from './roles/roles.component';
import {MedicamentosComponent} from './medicamentos/medicamentos.component';
import {MedicosComponent} from './medicos/medicos.component';
import {ServiciosComponent} from './servicios/servicios.component';


const routes: Routes = [
      { path: 'usuarios', component: UsuariosComponent },
       { path: 'roles', component: RolesComponent },
       { path: 'medicamentos', component: MedicamentosComponent },
       { path: 'medicos', component: MedicosComponent },
       { path: 'servicios', component: ServiciosComponent }
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
