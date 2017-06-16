import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProcedimientosRoutingModule } from './procedimientos-routing.module';
import { ProcedimientosComponent } from './procedimientos.component';
import { ModAddComponent } from './mod-add/mod-add.component';
import { ModEditComponent } from './mod-edit/mod-edit.component';
import { ModDelComponent } from './mod-del/mod-del.component';
import { TextMaskModule } from 'angular2-text-mask';

import {DataTableModule} from "angular2-datatable";
@NgModule({
  imports: [
    CommonModule,
    ProcedimientosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    DataTableModule,
    TextMaskModule
  ],
  declarations: [ProcedimientosComponent, ModAddComponent, ModEditComponent, ModDelComponent]
})
export class ProcedimientosModule { }
