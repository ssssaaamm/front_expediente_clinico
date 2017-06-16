import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JsonpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomFormsModule } from 'ng2-validation';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados.component';
import { ModAddComponent } from './mod-add/mod-add.component';
import { ModDelComponent } from './mod-del/mod-del.component';
import { ModEditComponent } from './mod-edit/mod-edit.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {DataTableModule} from "angular2-datatable";
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EmpleadosRoutingModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule.forRoot(),
    CustomFormsModule,
    DataTableModule,
    TextMaskModule

  ],
  declarations: [EmpleadosComponent, ModAddComponent, ModDelComponent, ModEditComponent]
})
export class EmpleadosModule { }
