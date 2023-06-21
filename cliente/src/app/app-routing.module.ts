import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';

import { LaborDocenteAgregarComponent } from './componets/labor-docente-agregar/labor-docente-agregar.component';
import { LaborDocenteListarComponent } from './componets/labor-docente-listar/labor-docente-listar.component';
import { UsuarioListarComponent } from './componets/usuario-listar/usuario-listar.component';
import { UsuarioAgregarComponent } from './componets/usuario-agregar/usuario-agregar.component';
import { MenuCoordinadorComponent } from './componets/menu-coordinador/menu-coordinador.component';
import {UsuarioEditarComponent} from './componets/usuario-editar/usuario-editar.component';
import { EvaluacionListComponent } from './componets/evaluacion-list/evaluacion-list.component';
import { EvaluacionFormComponent } from './componets/evaluacion-form/evaluacion-form.component';
import { LaborDocenteEditarComponent } from './componets/labor-docente-editar/labor-docente-editar.component';
import { DocenteComponent } from './componets/docente/docente.component'; 


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menuCoordinador',component : MenuCoordinadorComponent },
  { path: 'listar', component: UsuarioListarComponent },
  { path: 'agregar', component: UsuarioAgregarComponent },
  { path: 'editar/:id',component: UsuarioEditarComponent},
  { path: 'listarL', component: LaborDocenteListarComponent },
  { path: 'agregarL', component: LaborDocenteAgregarComponent },
  { path: 'editarL/:id',component: LaborDocenteEditarComponent},
  {path: 'evaluacion', component: EvaluacionListComponent},
  {path: 'evaluacion/add', component: EvaluacionFormComponent},
  {path: 'evaluacion/edit/:id', component: EvaluacionFormComponent},
  {path: 'docente/:id', component: DocenteComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
