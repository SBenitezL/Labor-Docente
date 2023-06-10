import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../Modelo/Usuario';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  url = "http://localhost:8080/Labor-Docente/usuario";
  getUsuario(){
    return this.http.get<Usuario[]>(this.url);
  }
}
