  import { Component, OnInit, HostBinding } from '@angular/core';
  import { Usuario } from '../../Modelo/Usuario';
  import { UseRol } from '../../Modelo/UseRol';
  import { ActivatedRoute, Router } from '@angular/router';
  import { ServiceService } from '../../Service/service.service';
  import { currentUser } from '../control-vista/control-vista.component';

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
      }else if(this.seleccionRolId=="opt4"){
        this.usuario.ROL_ID=4;
      }else{
        this.usuario.ROL_ID=5;
      }
    }
    obtenerId(): number {
      return this.usuario.USR_IDENTIFICACION;
    }

    mostrar: boolean = false;
    updateUsuario(): void {
      console.log(this.usuario.USR_IDENTIFICACION);
      this.mostrar = true;
      this.serviceService.updateUsuario(
        this.usuario.USR_IDENTIFICACION,
        this.usuario
      ).subscribe(
        res => {
          this.mostrar = true;
          console.log(res);
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
    

  IrPeriodo()
  {
    this.router.navigate(['/periodo']);
  }
    IrGestionDocente() {
      this.router.navigate(['/listar']);
    }
    IrGestionLabor() {
      this.router.navigate(['/listarL']);
    }
    IrEvaluacion() {
      this.router.navigate([`/coordinador/${currentUser.getCurrent()}`]);
    }
    IrInicio(){
      this.router.navigate([`/menuCoordinador/${currentUser.getCurrent()}`]);
    }
    IrGestionEvaluacion() {
      this.router.navigate(['/evaluacion']);
    }
    cerrarModal() {
      this.mostrar = false;
      this.router.navigate(['/listar']);

    }

  }
