import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/public/login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ListarComponent } from './usuario/listar/listar.component';
import { AgregarComponent } from './usuario/agregar/agregar.component';
import { EditarComponent } from './usuario/editar/editar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'listar', component: ListarComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'editar', component: EditarComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
