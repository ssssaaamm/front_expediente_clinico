import { NgModule } from '@angular/core';
import {PacientesComponent} from './pacientes.component'
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: PacientesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
