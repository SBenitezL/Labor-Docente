import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../Modelo/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public myForm!: FormGroup;
   usuario:Usuario={
    USR_IDENTIFICACION:0 ,
    USU_NOMBRE: '',
    USU_APELLIDO: '',
    USU_GENERO: '',
    USU_ESTUDIO: '',
    UserName: '',
    URS_Contrasenia:''
  };
  constructor(private fb:FormBuilder,private router:Router)
  {
    this.myForm = this.fb.group({
      user: ['', Validators.required],
      password:['', Validators.required]
    });
    
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

    }
    this.router.navigate(['/menuCoordinador'])
  }

}
