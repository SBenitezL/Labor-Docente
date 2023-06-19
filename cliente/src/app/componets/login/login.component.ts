import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Usuario } from '../../Modelo/Usuario';
import { UseRol } from '../../Modelo/UseRol';
import { ServiceService } from '../../Service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public myForm!: FormGroup;
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
  usuarios: Usuario[]= [];
  constructor(private fb:FormBuilder, private serviceService: ServiceService,
    private router: Router,
    private activeRouter: ActivatedRoute)
  {
    this.myForm = this.fb.group({
      user: ['', Validators.required],
      password:['', Validators.required]
    });
    this.serviceService.getUsuarios().subscribe(
      (res: any) => {
        console.log(res); 
        this.usuarios = res;
      },
      err => console.log(err)
    );
  }
 /*  getUsuariosAll(){
    this.serviceService.getUsuarios().subscribe(
      (res: any) => {
        console.log(res); 
        this.usuarios = res;
      },
      err => console.log(err)
    );
  }*/
  getUsuarioOne(id:number){
      this.serviceService.getUsuario(id).subscribe(
        res => {
          console.log(res);
          this.usuario = Object.assign({}, res) as Usuario & UseRol;
        },
        err => console.error(err)
      );
  }
  public submitFormulario(){
    //alert("Se va a enviar el formulario");
    console.log(this.myForm.value);
  }
  login(){
    const loginU = this.myForm.value.user;
    const pass = this.myForm.value.password;
    
    if (!loginU|| !pass) {
      alert("Campos vacios");
      return;
    }else{
     this.serviceService.validarContrasenia(pass,loginU).subscribe(
        res => {
          console.log(res);
          
        },
        err => console.error(err)
      );
      /*if((this.serviceService.validarContrasenia(pass,loginU))==2){

      }*/
      this.router.navigate(['/menuCoordinador']);
    }
    
  }
  verificarContrasenia(pass:string, login:string){
      
  }
  
}
