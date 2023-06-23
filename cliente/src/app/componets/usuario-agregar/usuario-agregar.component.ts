import { Component, OnInit, HostBinding} from '@angular/core';
import { Usuario } from '../../Modelo/Usuario';
import { UseRol} from '../../Modelo/UseRol';
import { ActivatedRoute, Router ,Route} from '@angular/router';
import { currentUser } from '../control-vista/control-vista.component';

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
    USR_Contrasenia: '',
    ROL_ID: 0,
    UR_FECHAINICIO: new Date(),
    UR_FECHAFIN: new Date(),
    
  };
   
    edit : boolean =false;
    
    seleccionRolId='';
    seleccionGenero='';
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
    
   
    usuarioAgregado: boolean = false;
    mostrar: boolean = false;
    mensajeUsuario:string = "";
    auxIdentificacion : string = '';
    saveNewUsuario(): void {
      this.usuario.USR_Contrasenia = this.contrasenia;
      this.usuario.USR_IDENTIFICACION = parseInt(this.auxIdentificacion);
      console.log(this.usuario.UserName);
      //this.mostrar = true;
      this.serviceService.saveUsuario(this.usuario)
        .subscribe(
          (res:any) => {
            
            this.mensajeUsuario = res.message;
            console.log(this.mensajeUsuario);
            this.mostrar = true;
            
            this.usuarioAgregado = true;       
            
          },
          err => {
            console.error(err);
          }
        );
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
    seleccionarGenero(){
      console.log(this.seleccionGenero);
      if(this.seleccionGenero=="M"){
        this.usuario.USU_GENERO="M";
      } else{
        this.usuario.USU_GENERO="F";
      }
    }
    updateUsuario(){
      
      console.log(this.usuario);
      this.serviceService.updateUsuario(this.usuario.USR_IDENTIFICACION,this.usuario);
      
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
    IrPeriodo()
    {
      this.router.navigate(['/periodo']);
    }
    public mostrarContrasenia: boolean = false;
    public contrasenia: string = '';

    public toggleMostrarContrasenia(): void {
      this.mostrarContrasenia = !this.mostrarContrasenia;
    }

}
