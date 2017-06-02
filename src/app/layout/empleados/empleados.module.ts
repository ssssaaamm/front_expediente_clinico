import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados.component';
import { ModAddComponent } from './mod-add/mod-add.component';
import { ModDelComponent } from './mod-del/mod-del.component';
import { ModEditComponent } from './mod-edit/mod-edit.component';

@NgModule({
  imports: [
    CommonModule,
    EmpleadosRoutingModule
  ],
  declarations: [EmpleadosComponent, ModAddComponent, ModDelComponent, ModEditComponent]
})
export class EmpleadosModule { }
