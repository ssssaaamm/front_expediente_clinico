import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { MedicosComponent } from './medicos/medicos.component';
import { RolesComponent } from './roles/roles.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ModalAddComponent } from './usuarios/modal-add/modal-add.component';
import { ModalEditComponent } from './usuarios/modal-edit/modal-edit.component';
import { ModalDelComponent } from './usuarios/modal-del/modal-del.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AdministracionRoutingModule,
  ],
  declarations: [UsuariosComponent, MedicamentosComponent, MedicosComponent, RolesComponent, ServiciosComponent, ModalAddComponent, ModalEditComponent, ModalDelComponent]
})
export class AdministracionModule { }
