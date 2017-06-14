import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { EnfermedadesRoutingModule } from './enfermedades-routing.module';
import { EnfermedadesComponent } from './enfermedades.component';
import { ModAddComponent } from './mod-add/mod-add.component';
import { ModEditComponent } from './mod-edit/mod-edit.component';
import { ModDelComponent } from './mod-del/mod-del.component';
import {DataTableModule} from "angular2-datatable";
@NgModule({
  imports: [
    CommonModule,
    EnfermedadesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    DataTableModule,
  ],
  declarations: [EnfermedadesComponent, ModAddComponent, ModEditComponent, ModDelComponent]
})
export class EnfermedadesModule { }
