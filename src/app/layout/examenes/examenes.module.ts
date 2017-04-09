import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExamenesRoutingModule } from './examenes-routing.module';
import { ExamenesComponent } from './examenes.component';
import { ModAddComponent } from './mod-add/mod-add.component';
import { ModEditComponent } from './mod-edit/mod-edit.component';
import { ModDelComponent } from './mod-del/mod-del.component';

@NgModule({
  imports: [
    CommonModule,
    ExamenesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [ExamenesComponent, ModAddComponent, ModEditComponent, ModDelComponent]
})
export class ExamenesModule { }
