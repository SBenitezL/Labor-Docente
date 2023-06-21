import { Component ,OnInit} from '@angular/core';

import { Usuario } from '../../Modelo/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';

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
  constructor(private router:Router,private activeRouter: ActivatedRoute,private serviceService: ServiceService){
  }
  ngOnInit(): void { 

        this.serviceService.getUsuarioRol(2).subscribe(
          res => {
            
            if (Array.isArray(res) && res.length > 0) {
              const userId=  res[0].USR_IDENTIFICACION;
              console.log(userId);
            } else {
              console.log("El array res está vacío o no es un array");
            }
          },
          err => console.error(err)
        );

  }
  IrGestionDocente() {
    this.router.navigate(['/listar']);
  }
  IrGestionLabor() {
    this.router.navigate(['/listarL']);
  }
  IrEvaluacion(id: number) {
    console.log(id);
    this.router.navigate(['/coordinador/'+id]);
  }

  IrGestionEvaluacion() {
    this.router.navigate(['/evaluacion']);
  }
  
}
