import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            {path: 'administracion/usuarios', loadChildren:'./usuarios/usuarios.module#UsuariosModule' },
            {path: 'administracion/especialidades', loadChildren:'./especialidades/especialidades.module#EspecialidadesModule' },
            {path: 'administracion/examenes', loadChildren:'./examenes/examenes.module#ExamenesModule' },
            {path: 'administracion/medicamentos', loadChildren:'./medicamentos/medicamentos.module#MedicamentosModule' },
            {path: 'administracion/medicos', loadChildren:'./medicos/medicos.module#MedicosModule' },
            {path: 'administracion/procedimientos', loadChildren:'./procedimientos/procedimientos.module#ProcedimientosModule' },
            {path: 'administracion/roles', loadChildren:'./roles/roles.module#RolesModule' },
            //{path: 'administracion/servicios', loadChildren:'./servicios/servicios.module#ServiciosModule' },
            {path: 'administracion/cirugias', loadChildren:'./cirugias/cirugias.module#CirugiasModule' },
            {path: 'administracion/consultas', loadChildren:'./consultas/consultas.module#ConsultasModule' },
            {path: 'administracion/enfermedades', loadChildren:'./enfermedades/enfermedades.module#EnfermedadesModule' },
            {path: 'administracion/ubicaciones', loadChildren:'./ubicaciones/ubicaciones.module#UbicacionesModule' },
            //{path: 'administracion', loadChildren:'./administracion/administracion.module#AdministracionModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
