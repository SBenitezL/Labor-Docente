import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule}from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './componets/login/login.component';


import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';


import {ServiceService} from './Service/service.service';
import { NavigationComponent } from './componets/navigation/navigation.component';
import { LaborDocenteAgregarComponent } from './componets/labor-docente-agregar/labor-docente-agregar.component';
import { LaborDocenteListarComponent } from './componets/labor-docente-listar/labor-docente-listar.component';
import { UsuarioListarComponent } from './componets/usuario-listar/usuario-listar.component';
import { UsuarioAgregarComponent } from './componets/usuario-agregar/usuario-agregar.component';
import { UsuarioEditarComponent } from './componets/usuario-editar/usuario-editar.component';
import { LaborDocenteEditarComponent } from './componets/labor-docente-editar/labor-docente-editar.component';
import { MenuCoordinadorComponent } from './componets/menu-coordinador/menu-coordinador.component';
import { EvaluacionListComponent } from './componets/evaluacion-list/evaluacion-list.component';
import { EvaluacionFormComponent } from './componets/evaluacion-form/evaluacion-form.component';
import { DocenteComponent } from './componets/docente/docente.component';
import { DecanoComponent } from './componets/decano/decano.component';
import { CoordinadorComponent } from './componets/coordinador/coordinador.component';
import { MiddlewareComponent } from './componets/middleware/middleware.component';
import { PeriodoFormComponent } from './componets/periodo-form/periodo-form.component';
import { PeriodoListComponent } from './componets/periodo-list/periodo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LaborDocenteAgregarComponent,
    LaborDocenteListarComponent,
    UsuarioListarComponent,
    UsuarioAgregarComponent,
    NavigationComponent,
    UsuarioEditarComponent,
    LaborDocenteEditarComponent,
    MenuCoordinadorComponent,
    EvaluacionListComponent,
    EvaluacionFormComponent,
    DocenteComponent,
    DecanoComponent,
    CoordinadorComponent,
    MiddlewareComponent,
    PeriodoFormComponent,
    PeriodoListComponent
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
