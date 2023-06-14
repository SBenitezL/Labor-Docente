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
      USR_IDENTIFICACION: 0,
      USU_NOMBRE: '',
      USU_APELLIDO: '',
      USU_GENERO: '',
      USU_ESTUDIO: ''
    };
    constructor(private usuarioService: ServiceService,private router:Router,private activeRouter:ActivatedRoute){
    }
    ngOnInit(): void {
      const params = this.activeRouter.snapshot.params;
      if (params['id']) {
        this.usuarioService.getUsuario(params['id']).subscribe(
          res => {
            console.log(res);
            
            this.usuario = Object.assign({}, res) as Usuario;
          },
          err => console.error(err)
        );
      }
    }
    
    saveNewUsuario(){
      this.usuarioService.saveUsuario(this.usuario)
      .subscribe(
        res =>{
          console.log(res);
          this.router.navigate(['/agregar']);
        },
        err =>console.error(err)
      )
    }

  }
