import { Component, OnInit, HostBinding} from '@angular/core';
import { Usuario } from '../../Modelo/Usuario';
import { UseRol} from '../../Modelo/UseRol';
import { ActivatedRoute, Router ,Route} from '@angular/router';


import { ServiceService } from '../../Service/service.service';
@Component({
  selector: 'app-usuario-agregar',
  templateUrl: './usuario-agregar.component.html',
  styleUrls: ['./usuario-agregar.component.css']
})
export class UsuarioAgregarComponent implements OnInit{
  @HostBinding('class')classes= 'row'

  usuario: Usuario & UseRol = {
    USR_IDENTIFICACION: 0,
    USU_NOMBRE: '',
    USU_APELLIDO: '',
    USU_GENERO: '',
    USU_ESTUDIO: '',
    UserName: '',
    URS_Contrasenia: '',
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
            this.edit = true;
          },
          err => console.error(err)
        );
      }
    }
    
   
   /*saveNewUsuario(){
      
      this.serviceService.saveUsuario(this.usuario)
      .subscribe(
        res =>{
          console.log(res);
          
          this.usuarioAgregado = true;
          this.router.navigate(['/listar']);
        },
        err =>console.error(err)
      )
    }*/
    usuarioAgregado: boolean = false;

    saveNewUsuario(): void {
      this.serviceService.saveUsuario(this.usuario)
        .subscribe(
          res => {
            console.log(res);
            this.usuarioAgregado = true;
            this.router.navigate(['/listar']);
          },
          err => console.error(err)
        );
    }
    
    

    updateUsuario(){
      console.log(this.usuario);
      this.serviceService.updateUsuario(this.usuario.USR_IDENTIFICACION,this.usuario);
    }

}
