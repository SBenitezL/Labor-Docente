import { Component ,OnInit} from '@angular/core';

import { Usuario } from '../../Modelo/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Notificacion } from 'src/app/Modelo/Notificacion';

@Component({
  selector: 'app-menu-coordinador',
  templateUrl: './menu-coordinador.component.html',
  styleUrls: ['./menu-coordinador.component.css']
})

export class MenuCoordinadorComponent {
  usuario: Usuario  = {
    USR_IDENTIFICACION: 0,
    USU_NOMBRE: '',
    USU_APELLIDO: '',
    USU_GENERO: '',
    USU_ESTUDIO: '',
    UserName: '',
    USR_Contrasenia: '',
  
  };
  notificaciones:Notificacion[] = [];
  sesion = 0;
  constructor(private router:Router,private activeRouter: ActivatedRoute,private serviceService: ServiceService){
    this.sesion = this.activeRouter.snapshot.params["id"];
  }
  ngOnInit(): void { 


        this.serviceService.getUsuario(this.sesion).subscribe(
          res => {
            this.usuario = res as Usuario;
            } 
            ,
          err => console.error(err)
        );
        this.cargarNotificaciones();
  }
  cargarNotificaciones()
  {
    this.serviceService.getNotificacionesUser(this.sesion).subscribe(
      res => {
        this.notificaciones = res as Notificacion[];
        console.log(this.notificaciones);
        } 
        ,
      err => console.error(err)
    );
  }
  IrGestionDocente() {
    this.router.navigate(['/listar']);
  }
  IrGestionLabor() {
    this.router.navigate(['/listarL']);
  }
  IrEvaluacion() {
    this.router.navigate(['/coordinador/'+this.usuario.USR_IDENTIFICACION]);
  }

  IrGestionEvaluacion() {
    this.router.navigate(['/evaluacion']);
  }
  IrPeriodo()
  {
    this.router.navigate(['/periodo']);
  }
}
