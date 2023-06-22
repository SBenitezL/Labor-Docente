import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../Modelo/Usuario';
import { Evaluacion } from '../Modelo/Evaluacion';
import { EvaluacionEst } from '../Modelo/EvaluacionEstructura';
import { EvaluacionEdit } from '../Modelo/EvaluacionEdit';
import {} from '../Modelo/Usuario';
import { LaborDocente } from '../Modelo/LaborDocente';
import { Observable } from 'rxjs';
import { PeriodoUtil } from '../Modelo/PeriodoUtil';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  API_URI = 'http://localhost:3000/api'
  constructor(private http:HttpClient) { }
  //url = "http://localhost:8080/Labor-Docente/usuario";
  getUsuarios(){
    return this.http.get('http://localhost:3000/api/usuarios');
  }

  getUsuario(id:number){
    return this.http.get(`${this.API_URI}/usuarios/${id}`);
  }


  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.API_URI}/usuarios/${id}`);
  }
  
  saveUsuario(usuario: Usuario) {
    console.log(usuario.UserName);
    return this.http.post(`${this.API_URI}/usuarios/`, usuario);
  }
  saveUserol(userol: any) {
    return this.http.post(`${this.API_URI}/userol/`, userol);
  }
  updateUsuario(id: number, updatedUsuario: Usuario) {
      console.log(updatedUsuario);
      return this.http.put(`${this.API_URI}/usuarios/${id}`, updatedUsuario);
  }
  
  getLabores(){
    return this.http.get('http://localhost:3000/api/labor');
  }

  getLabor(id:number){
    return this.http.get(`${this.API_URI}/labor/${id}`);
  }

  deleteLabor(id: number): Observable<any> {
    return this.http.delete(`${this.API_URI}/labor/${id}`);
  }
  
  saveLabor(laborDocente: LaborDocente) {
    return this.http.post(`${this.API_URI}/labor/`, laborDocente);
  }
  updateLabor(id: number, updatedLabor: LaborDocente) {
    console.log(updatedLabor);
    return this.http.put(`${this.API_URI}/labor/${id}`, updatedLabor);
}

  getTipo(id:number){

  }

  getEvaluaciones(){
    return this.http.get(`${this.API_URI}/evaluacion`);
  }

  getEvaluacion(id:number)
  {
    return this.http.get(`${this.API_URI}/evaluacion/${id}`);
  }

  saveEvaluacion(evaluacion:EvaluacionEst)
  {
    return this.http.post(`${this.API_URI}/evaluacion`,evaluacion);
  }

  deleteEvaluacion(id:number)
  {
    return this.http.delete(`${this.API_URI}/evaluacion/${id}`);
  }
  updateEvaluacion(id:number, updatedEvaluacion:EvaluacionEst)
  {
    return this.http.put(`${this.API_URI}/evaluacion/update/${id}`,updatedEvaluacion);
  }

  getLaborToAdd(){
    return this.http.get(`${this.API_URI}/labor/to/add`);
  }
  getUseRolToAdd()
  {
    return this.http.get(`${this.API_URI}/userol`)
  }
  insertPeriodo(periodo:PeriodoUtil)
  {
    return this.http.post(`${this.API_URI}/periodo/add`,periodo);
  }
  getPeriodoToAdd()
  {
    return this.http.get(`${this.API_URI}/periodo`);
  }
  validarContrasenia(contrasenia:string, login:string){
    return this.http.get(`${this.API_URI}/usuarios/${contrasenia}/${login}`);
  }
  getToEditEvaluacion(id:number){
    return this.http.get(`${this.API_URI}/evaluacion/edit/${id}`)
  }
  getNotificacionesUser(id:number){
    return this.http.get(`${this.API_URI}/notificacion/${id}`);
  }
  updateOwnEvaluacion(datos:EvaluacionEdit){
    return this.http.post(`${this.API_URI}/evaluacion/update/own`,datos);
  }
}
