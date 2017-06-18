import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import {JsonpModule} from '@angular/http';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosComponent } from './medicos.component';
import { CitasComponent } from './citas/citas.component';
import { PerfilComponent } from './perfil/perfil.component';
import {ModCirugiasComponent} from './expediente/mod-cirugias/mod-cirugias.component';
import {ModConsultasComponent} from './expediente/mod-consultas/mod-consultas.component';
import {ModDatosComponent} from './expediente/mod-datos/mod-datos.component';
import {ModDiagnosticosComponent} from './expediente/mod-diagnosticos/mod-diagnosticos.component';
import {ModExamenesComponent} from './expediente/mod-examenes/mod-examenes.component';
import {ModSignosComponent} from './expediente/mod-signos/mod-signos.component';
import { ExpedienteComponent } from './expediente/expediente.component';
import { ProgramarComponent } from './expediente/mod-cirugias/programar/programar.component';
import { AsignarComponent } from './expediente/mod-examenes/asignar/asignar.component';
import { AddDiagnosticoComponent } from './expediente/mod-diagnosticos/add-diagnostico/add-diagnostico.component';
import { DataTableModule } from "angular2-datatable";




@NgModule({
  imports: [
    CommonModule,
    MedicosRoutingModule,CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    TextMaskModule,
    DataTableModule,
    JsonpModule,
  ],
  declarations: [MedicosComponent, CitasComponent, PerfilComponent,ModCirugiasComponent,
  ModConsultasComponent, ModDatosComponent,ModDiagnosticosComponent,ModExamenesComponent,ModSignosComponent, ExpedienteComponent, ProgramarComponent, AsignarComponent, AddDiagnosticoComponent]
})
export class MedicosModule { }
