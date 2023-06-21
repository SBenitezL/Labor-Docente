import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Evaluacion } from 'src/app/Modelo/Evaluacion';
import { Usuario } from 'src/app/Modelo/Usuario';

@Component({
  selector: 'app-coordinador',
  templateUrl: './coordinador.component.html',
  styleUrls: ['./coordinador.component.css']
})
export class CoordinadorComponent implements OnInit{
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


  constructor(private activeRouter: ActivatedRoute, private serviceService: ServiceService) { }

  ngOnInit() {
    const id = this.activeRouter.snapshot.params['id'];
    console.log('Valor de id :', id); 

    if (id) {
      this.serviceService.getUsuario(id).subscribe(
        (res: any) => {
          console.log(res);
          this.usuario = res as Usuario;
          this.getEvaluacion(id);
        },
        err => console.error(err)
      );
    }
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