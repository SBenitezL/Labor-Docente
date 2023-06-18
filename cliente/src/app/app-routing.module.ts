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
import { LaborDocenteEditarComponent } from './componets/labor-docente-editar/labor-docente-editar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menuCoordinador',component : MenuCoordinadorComponent },
  { path: 'listar', component: UsuarioListarComponent },
  { path: 'agregar', component: UsuarioAgregarComponent },
  { path: 'editar/:id',component: UsuarioEditarComponent},
  { path: 'listarL', component: LaborDocenteListarComponent },
  { path: 'agregarL', component: LaborDocenteAgregarComponent },
  { path: 'editarL/:id',component: LaborDocenteEditarComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
