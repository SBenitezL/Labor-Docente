import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/public/login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ListarComponent } from './usuario/listar/listar.component';
import { AgregarComponent } from './usuario/agregar/agregar.component';
import {LaborDocenteComponent} from './labor-docente/labor-docente.component';
import {AgregarLaborComponent} from './labor-docente/agregar-labor/agregar-labor.component';
import {ListarLaborComponent} from './labor-docente/listar-labor/listar-labor.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'listar', component: ListarComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'editar/:id',component: AgregarComponent},
  { path: 'laborDocente', component: LaborDocenteComponent },
  { path: 'listarL', component: ListarLaborComponent },
  { path: 'agregarL', component: AgregarLaborComponent },
  { path: 'editarL/:id',component: AgregarLaborComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
