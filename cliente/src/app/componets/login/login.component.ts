import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    USU_ESTUDIO: ''
  };
  constructor(private fb:FormBuilder,private router:Router)
  {

  }
  ngOnInit():void{
    this.myForm = this.createMyForm();
  }
  private createMyForm():FormGroup{
      return this.fb.group(
        {
          user:[],
          password:[]
        }
      );
  }

  public submitFormulario(){
    //alert("Se va a enviar el formulario");
    console.log(this.myForm.value);
  }
  login(){

    this.router.navigate(['/listar'])
  }

}
