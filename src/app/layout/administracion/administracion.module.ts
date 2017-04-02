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
import { RolesModalAddComponent } from './roles/roles-modal-add/roles-modal-add.component';
import { RolesModalDelComponent } from './roles/roles-modal-del/roles-modal-del.component';
import { RolesModalEditComponent } from './roles/roles-modal-edit/roles-modal-edit.component';
import { UsuariosModalAddComponent } from './usuarios/usuarios-modal-add/usuarios-modal-add.component';
import { UsuariosModalDelComponent } from './usuarios/usuarios-modal-del/usuarios-modal-del.component';
import { UsuariosModalEditComponent } from './usuarios/usuarios-modal-edit/usuarios-modal-edit.component';
import { MedicamentosModalAddComponent } from './medicamentos/medicamentos-modal-add/medicamentos-modal-add.component';
import { MedicamentosModalDelComponent } from './medicamentos/medicamentos-modal-del/medicamentos-modal-del.component';
import { MedicamentosModalEditComponent } from './medicamentos/medicamentos-modal-edit/medicamentos-modal-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AdministracionRoutingModule,
  ],
  declarations: [UsuariosComponent, MedicamentosComponent, MedicosComponent, RolesComponent, ServiciosComponent, RolesModalAddComponent, RolesModalDelComponent, RolesModalEditComponent, UsuariosModalAddComponent, UsuariosModalDelComponent, UsuariosModalEditComponent, MedicamentosModalAddComponent, MedicamentosModalDelComponent, MedicamentosModalEditComponent]
})
export class AdministracionModule { }
