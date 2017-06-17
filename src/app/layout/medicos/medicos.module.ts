import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import {JsonpModule} from '@angular/http';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosComponent } from './medicos.component';
import { CitasComponent } from './citas/citas.component';
import { AtenderComponent } from './citas/atender/atender.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule,
    MedicosRoutingModule,CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    TextMaskModule,
    JsonpModule,
  ],
  declarations: [MedicosComponent, CitasComponent, AtenderComponent, PerfilComponent]
})
export class MedicosModule { }
