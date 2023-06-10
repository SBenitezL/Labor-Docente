import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  constructor(private router:Router){

  }
  listar(){
    this.router.navigate(["listar"])
  }
  nuevo(){
    this.router.navigate(["agregar"])
  }
}
