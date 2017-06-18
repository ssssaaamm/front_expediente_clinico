import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicosComponent } from './medicos.component';
import { CitasComponent } from "app/layout/medicos/citas/citas.component";
import { ModDiagnosticosComponent } from "app/layout/medicos/expediente/mod-diagnosticos/mod-diagnosticos.component";
import { ExpedienteComponent } from "app/layout/medicos/expediente/expediente.component";

const routes: Routes = [
   { path: '', component: MedicosComponent
     
    //   path: 'expediente', component: 
  /*children :[
    {
      path: 'citas',
      component: CitasComponent,      
    },
  ]*/
 },
 {path: 'atencion', component: ExpedienteComponent}
   
];
export const routableComponents = [
  CitasComponent,
  ModDiagnosticosComponent,
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
