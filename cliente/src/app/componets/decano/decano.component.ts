import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Evaluacion } from 'src/app/Modelo/Evaluacion';
import { Usuario } from 'src/app/Modelo/Usuario';
import { currentUser } from '../control-vista/control-vista.component';
import { Notificacion } from 'src/app/Modelo/Notificacion';

@Component({
  selector: 'app-decano',
  templateUrl: './decano.component.html',
  styleUrls: ['./decano.component.css']
})
export class DecanoComponent implements OnInit{
    evaluaciones: Evaluacion[] = [];
    usuario: Usuario  = {
      USR_IDENTIFICACION: 0,
      USU_NOMBRE: '',
      USU_APELLIDO: '',
      USU_GENERO: '',
      USU_ESTUDIO: '',
      UserName: '',
      USR_Contrasenia: '' 
    };
    notificaciones:Notificacion[] = [];
    id = currentUser.getCurrent();
    constructor(private serviceService: ServiceService) { }
  
    ngOnInit() {
      console.log('Valor de id :', this.id); 
  
      if (this.id) {
        this.serviceService.getUsuario(this.id).subscribe(
          (res: any) => {
            console.log(res);
            this.usuario = res as Usuario;
            this.getEvaluacion(this.id);
          },
          err => console.error(err)
        );
      }
    }
    getNotificaciones()
    {
     this.serviceService.getNotificacionesUser(this.id).subscribe(
      res=>{
        this.notificaciones = res as Notificacion[];
      },
      err=>console.log(err)
     );
    }
  
    getEvaluacion(docenteId: number) {
      console.log('Valor de id en getEvaluacion:', docenteId); 
      this.serviceService.getEvaluacion(docenteId).subscribe(
        (res: any) => {
          console.log(res);
          this.evaluaciones = res;
        },
        err => console.error(err)
      );
    }
    formatFecha(fecha: string | Date): string {
      if (typeof fecha === 'string') {
        fecha = new Date(fecha);
      }
      const formattedDate = fecha.toISOString().split('T')[0];
      return formattedDate;
    }
  }


