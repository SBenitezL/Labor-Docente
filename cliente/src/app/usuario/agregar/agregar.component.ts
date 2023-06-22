  import { Component, OnInit, HostBinding} from '@angular/core';
  import { Usuario } from 'src/app/Modelo/Usuario';
  import { ActivatedRoute, Router } from '@angular/router';
  
  import { ServiceService } from 'src/app/Service/service.service';
  @Component({
    selector: 'app-agregar',  
    templateUrl: './agregar.component.html',
    styleUrls: ['./agregar.component.css']
  })
  export class AgregarComponent implements OnInit {
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
            Object.assign(this.usuario, res);
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
