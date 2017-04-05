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
import { MedicosModalAddComponent } from './medicos/medicos-modal-add/medicos-modal-add.component';
import { MedicosModalDelComponent } from './medicos/medicos-modal-del/medicos-modal-del.component';
import { MedicosModalEditComponent } from './medicos/medicos-modal-edit/medicos-modal-edit.component';
import { ServiciosModalAddComponent } from './servicios/servicios-modal-add/servicios-modal-add.component';
import { ServiciosModalEditComponent } from './servicios/servicios-modal-edit/servicios-modal-edit.component';
import { ServiciosModalDelComponent } from './servicios/servicios-modal-del/servicios-modal-del.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { EspecialidadesModalAddComponent } from './especialidades/especialidades-modal-add/especialidades-modal-add.component';
import { EspecialidadesModalEditComponent } from './especialidades/especialidades-modal-edit/especialidades-modal-edit.component';
import { EspecialidadesModalDelComponent } from './especialidades/especialidades-modal-del/especialidades-modal-del.component';
import { ExamenesComponent } from './examenes/examenes.component';
import { ExamenesModalAddComponent } from './examenes/examenes-modal-add/examenes-modal-add.component';
import { ExamenesModalDelComponent } from './examenes/examenes-modal-del/examenes-modal-del.component';
import { ExamenesModalEditComponent } from './examenes/examenes-modal-edit/examenes-modal-edit.component';
import { PrecedimientosComponent } from './precedimientos/precedimientos.component';
import { ProcedimientosModalAddComponent } from './precedimientos/procedimientos-modal-add/procedimientos-modal-add.component';
import { ProcedimientosModalDelComponent } from './precedimientos/procedimientos-modal-del/procedimientos-modal-del.component';
import { ProcedimientosModalEditComponent } from './precedimientos/procedimientos-modal-edit/procedimientos-modal-edit.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AdministracionRoutingModule,
  ],
  declarations: [UsuariosComponent, MedicamentosComponent, MedicosComponent, RolesComponent, ServiciosComponent, RolesModalAddComponent, RolesModalDelComponent, RolesModalEditComponent, UsuariosModalAddComponent, UsuariosModalDelComponent, UsuariosModalEditComponent, MedicamentosModalAddComponent, MedicamentosModalDelComponent, MedicamentosModalEditComponent, MedicosModalAddComponent, MedicosModalDelComponent, MedicosModalEditComponent, ServiciosModalAddComponent, ServiciosModalEditComponent, ServiciosModalDelComponent, EspecialidadesComponent, EspecialidadesModalAddComponent, EspecialidadesModalEditComponent, EspecialidadesModalDelComponent, ExamenesComponent, ExamenesModalAddComponent, ExamenesModalDelComponent, ExamenesModalEditComponent, PrecedimientosComponent, ProcedimientosModalAddComponent, ProcedimientosModalDelComponent, ProcedimientosModalEditComponent ]
})
export class AdministracionModule { }
