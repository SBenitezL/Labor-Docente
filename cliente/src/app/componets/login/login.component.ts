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
    userName: '',
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
      // Si los campos están vacíos, puedes mostrar un mensaje de error o realizar alguna acción adicional
      alert("Campos vacios");
      return;
    }else{

     // this.getUsuariosAll();
      this.verificarAcceso(pass,loginU);
     
    }
    
  }
  verificarAcceso(pass:string, loginU:string){
      for(let i=0; i<this.usuarios.length;i++){
        

        if((this.usuarios[i].USR_Contrasenia == pass) && (this.usuarios[i].userName == loginU)){
          console.log(this.usuarios[i].USR_IDENTIFICACION);
        
            this.serviceService.getUsuario(this.usuarios[i].USR_IDENTIFICACION).subscribe(
              res => {
                console.log(res);
                this.usuario = Object.assign({}, res) as Usuario & UseRol;
                if(this.usuario.ROL_ID== 2){
                  this.router.navigate(['/menuCoordinador'])
                }
              },
              err => console.error(err)
              );
        }
      }
  }
}
