import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JsonpModule} from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {DataTableModule} from "angular2-datatable"
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { ModAddComponent } from './mod-add/mod-add.component';
import { ModEditComponent } from './mod-edit/mod-edit.component';
import { ModDelComponent } from './mod-del/mod-del.component';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  imports: [
    CommonModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    PacientesRoutingModule,
    TextMaskModule,
    DataTableModule,
  ],
  declarations: [PacientesComponent, ModAddComponent, ModEditComponent, ModDelComponent]
})
export class PacientesModule { }
