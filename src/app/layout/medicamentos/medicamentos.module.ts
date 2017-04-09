import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MedicamentosRoutingModule } from './medicamentos-routing.module';
import { MedicamentosComponent } from './medicamentos.component';
import { ModAddComponent } from './mod-add/mod-add.component';
import { ModEditComponent } from './mod-edit/mod-edit.component';
import { ModDelComponent } from './mod-del/mod-del.component';

@NgModule({
  imports: [
    CommonModule,
    MedicamentosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [MedicamentosComponent, ModAddComponent, ModEditComponent, ModDelComponent]
})
export class MedicamentosModule { }
