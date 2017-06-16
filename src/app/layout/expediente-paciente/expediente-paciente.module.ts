import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExpedientePacienteRoutingModule } from './expediente-paciente-routing.module';
import { ExpedientePacienteComponent } from './expediente-paciente.component';
import { CitasComponent } from './citas/citas.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { ExamenesComponent } from './examenes/examenes.component';
import { CirugiasComponent } from './cirugias/cirugias.component';
import { PadecimientosComponent } from './padecimientos/padecimientos.component';
import { ModAddComponent } from './citas/mod-add/mod-add.component';
import { ModDelComponent } from './citas/mod-del/mod-del.component';
import { ModInfComponent } from './citas/mod-inf/mod-inf.component';
import { ModDetalleComponent } from './consultas/mod-detalle/mod-detalle.component';

@NgModule({
  imports: [
    ExpedientePacienteRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  declarations: [ExpedientePacienteComponent, CitasComponent, ConsultasComponent, ExamenesComponent, CirugiasComponent, PadecimientosComponent, ModAddComponent, ModDelComponent, ModInfComponent, ModDetalleComponent]
})
export class ExpedientePacienteModule { }
