import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Evaluacion } from 'src/app/Modelo/Evaluacion';
import { Usuario } from 'src/app/Modelo/Usuario';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
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


  constructor(private activeRouter: ActivatedRoute, private serviceService: ServiceService, private router: Router) { }

  ngOnInit() {
    this.getEvaluacion();
  }
  getEvaluacion() {
    const id = this.activeRouter.snapshot.params['id'];
    const per_id = this.activeRouter.snapshot.params['per_id'];
    if (id && per_id) {
      console.log("Entro");
      this.serviceService.getEvaluacion(id, per_id).subscribe(
        (res: any) => {
          console.log(res);
          this.evaluaciones = res;
        },
        err => console.error(err)
      );
  
      // Obtener información del usuario
      this.serviceService.getUsuario(id).subscribe(
        (res: any) => {
          console.log(res);
          this.usuario = res;
        },
        err => console.error(err)
      );
    }
  }
  
}  


