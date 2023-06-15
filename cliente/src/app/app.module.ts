import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule}from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './layout/public/login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ListarComponent } from './usuario/listar/listar.component';
import { AgregarComponent } from './usuario/agregar/agregar.component';
import { FormsModule } from '@angular/forms';


import {ServiceService} from './Service/service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuarioComponent,
    ListarComponent,
    AgregarComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
