import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';
import { ModAddComponent } from './mod-add/mod-add.component';
import { ModEditComponent } from './mod-edit/mod-edit.component';
import { ModDelComponent } from './mod-del/mod-del.component';

import { DataTableModule } from "angular2-datatable";

@NgModule({
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    DataTableModule
  ],
  declarations: [ServiciosComponent, ModAddComponent, ModEditComponent, ModDelComponent]
})
export class ServiciosModule { }
