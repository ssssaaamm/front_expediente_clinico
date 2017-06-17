import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { ModAddComponent } from './mod-add/mod-add.component';
import { ModDelComponent } from './mod-del/mod-del.component';
import { ModEditComponent } from './mod-edit/mod-edit.component';
import { PermisosComponent } from './permisos/permisos.component';
import {DataTableModule} from "angular2-datatable"
@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    TextMaskModule,
    DataTableModule,    
    
  ],
  declarations: [RolesComponent, ModAddComponent, ModDelComponent, ModEditComponent, PermisosComponent]
})
export class RolesModule { }
