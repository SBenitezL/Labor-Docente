<<<<<<< HEAD
import { Component} from '@angular/core';
=======
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
>>>>>>> 13fb7083b22fe0ff4fc1007d75312d0adb106d0c

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
<<<<<<< HEAD
  
=======

    public myForm!: FormGroup;

    constructor(private fb:FormBuilder)
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
      alert("Se va a enviar el formulario");
      console.log(this.myForm.value);

    }
>>>>>>> 13fb7083b22fe0ff4fc1007d75312d0adb106d0c
}
