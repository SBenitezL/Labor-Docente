import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../Modelo/Usuario';

import {} from '../Modelo/Usuario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  API_URI = 'http://localhost:3000/api'
  constructor(private http:HttpClient) { }
  //url = "http://localhost:8080/Labor-Docente/usuario";
  getUsuarios(){
    return this.http.get('http://localhost:3000/api/navigation');
  }

  getUsuario(id:number){
    return this.http.get(`${this.API_URI}/usuarios/${id}`);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.API_URI}/usuarios/${id}`);
  }
  
  saveUsuario(usuario: Usuario) {
    return this.http.post(`${this.API_URI}/usuarios/`, usuario);
  }
  updateUsuario(id: number, updatedUsuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URI}/usuarios/${id}`, updatedUsuario);
  }
  
}
