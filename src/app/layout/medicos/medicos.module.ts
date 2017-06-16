import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosComponent } from './medicos.component';
import { CitasComponent } from './citas/citas.component';
import { AtenderComponent } from './citas/atender/atender.component';

@NgModule({
  imports: [
    CommonModule,
    MedicosRoutingModule
  ],
  declarations: [MedicosComponent, CitasComponent, AtenderComponent]
})
export class MedicosModule { }
