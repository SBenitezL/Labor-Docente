import { Component, OnInit, HostBinding} from '@angular/core';
import { Usuario } from '../../Modelo/Usuario';
import { UseRol} from '../../Modelo/UseRol';
import { ActivatedRoute, Router ,Route} from '@angular/router';
import { ServiceService } from '../../Service/service.service';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit {
   @HostBinding('class')classes= 'row'
  
  
    usuario: Usuario & UseRol = {
      USR_IDENTIFICACION: 0,
      USU_NOMBRE: '',
      USU_APELLIDO: '',
      USU_GENERO: '',
      USU_ESTUDIO: '',
      UserName: '',
      USR_Contrasenia: '',
      UR_FECHAINICIO: new Date(),
      UR_FECHAFIN: new Date(),
      ROL_ID: 0,
    };
    edit : boolean =false;
    constructor(private serviceService: ServiceService,private router:Router,private activeRouter:ActivatedRoute){
      
    }
    ngOnInit(): void {
      
      const params = this.activeRouter.snapshot.params;
      if (params['id']) {
        this.serviceService.getUsuario(params['id']).subscribe(
          res => {
            console.log(res);
            this.usuario=res as Usuario&UseRol ;
            console.log(this.usuario)
            this.edit = true;
          },
          err => console.error(err)
        );
      }
    }
    
    
    obtenerId(){
      return this.usuario.USR_IDENTIFICACION;
    }
    updateUsuario(){
      console.log(this.usuario.USR_IDENTIFICACION);
      this.serviceService.updateUsuario(this.usuario.USR_IDENTIFICACION,this.usuario);
    }
}
