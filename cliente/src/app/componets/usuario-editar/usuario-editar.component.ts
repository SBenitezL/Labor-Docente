  import { Component, OnInit, HostBinding } from '@angular/core';
  import { Usuario } from '../../Modelo/Usuario';
  import { UseRol } from '../../Modelo/UseRol';
  import { ActivatedRoute, Router } from '@angular/router';
  import { ServiceService } from '../../Service/service.service';

  @Component({
    selector: 'app-usuario-editar',
    templateUrl: './usuario-editar.component.html',
    styleUrls: ['./usuario-editar.component.css']
  })
  export class UsuarioEditarComponent implements OnInit {
    @HostBinding('class') classes = 'row';

    usuario: Usuario & UseRol = {
      USR_IDENTIFICACION: 0,
      USU_NOMBRE: '',
      USU_APELLIDO: '',
      USU_GENERO: '',
      USU_ESTUDIO: '',
      UserName: '',
      USR_Contrasenia: '',
      ROL_ID: 0,
      UR_FECHAINICIO: new Date(),
      UR_FECHAFIN: new Date(),
    
    };
    edit: boolean = false;
    seleccionRolId='';

    constructor(
      private serviceService: ServiceService,
      private router: Router,
      private activeRouter: ActivatedRoute
    ) {}

    ngOnInit(): void {
      const params = this.activeRouter.snapshot.params;
      if (params['id']) {
        this.serviceService.getUsuario(params['id']).subscribe(
          res => {
            console.log(res);
            this.usuario = Object.assign({}, res) as Usuario & UseRol;
            console.log(this.usuario);
            this.edit = true;
           

          },
          err => console.error(err)
        );
      }
    }
    seleccionarTipoLabor(){
      console.log(this.seleccionRolId);
      if(this.seleccionRolId=="opt1"){
        this.usuario.ROL_ID=1;
      } else if(this.seleccionRolId=="opt2"){
        this.usuario.ROL_ID=2;
      } else if(this.seleccionRolId=="opt3"){
        this.usuario.ROL_ID=3;
      }else{
        this.usuario.ROL_ID=4;
      }
    }
    obtenerId(): number {
      return this.usuario.USR_IDENTIFICACION;
    }

    updateUsuario(): void {
      console.log(this.usuario.USR_IDENTIFICACION);
      this.serviceService.updateUsuario(
        this.usuario.USR_IDENTIFICACION,
        this.usuario
      ).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/listar']);
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
    

    
    IrGestionDocente() {
      this.router.navigate(['/list  ar']);
    }
    IrGestionLabor() {
      this.router.navigate(['/listarL']);
    }
    IrEvaluacion() {
      this.router.navigate(['/listarL']);
    }
    IrInicio(){
      this.router.navigate(['/menuCoordinador']);
    }

  }
