import { Component, OnInit, HostBinding} from '@angular/core';
import { Usuario } from '../../Modelo/Usuario';
import { ActivatedRoute, Router ,Route} from '@angular/router';


import { ServiceService } from '../../Service/service.service';
@Component({
  selector: 'app-usuario-agregar',
  templateUrl: './usuario-agregar.component.html',
  styleUrls: ['./usuario-agregar.component.css']
})
export class UsuarioAgregarComponent implements OnInit{
  @HostBinding('class')classes= 'row'

    usuario:Usuario={
      USR_IDENTIFICACION:0 ,
      USU_NOMBRE: '',
      USU_APELLIDO: '',
      USU_GENERO: '',
      USU_ESTUDIO: ''
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
            this.usuario=res as Usuario ;
            this.edit = true;
          },
          err => console.error(err)
        );
      }
    }
    
    
    usuarioAgregado: boolean = false;
    saveNewUsuario(){
      
      this.serviceService.saveUsuario(this.usuario)
      .subscribe(
        res =>{
          console.log(res);
          
          this.usuarioAgregado = true;
          this.router.navigate(['/listar']);
        },
        err =>console.error(err)
      )
    }

    updateUsuario(){
      console.log(this.usuario);
      this.serviceService.updateUsuario(this.usuario.USR_IDENTIFICACION,this.usuario);
    }

}
