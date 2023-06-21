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
          if (Array.isArray(res) && res.length > 0) {
            const rolId = res[0].ROL_ID;
            const userId=  res[0].USR_IDENTIFICACION;
            this.verificarVista(rolId,userId);
          } else {
            console.log("El array res está vacío o no es un array");
          }
        },
        err => console.error(err)
      );
      
      
    }
    
  }
  verificarVista(rol:number,userId:number){
      if(rol==2){
        console.log(userId);
        this.router.navigate([`/menuCoordinador/${userId}`]);

      }else if(rol==3 || rol==4 || rol==5){
        this.router.navigate([`/docente/${userId}`]);
      }
  }
  
}
