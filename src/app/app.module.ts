import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './layout/public/login/login.component';
<<<<<<< HEAD
import { UsuarioComponent } from './usuario/usuario.component';
=======
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
>>>>>>> 13fb7083b22fe0ff4fc1007d75312d0adb106d0c

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
