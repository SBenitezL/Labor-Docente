import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent {
  constructor(private router:Router){
    this.router.navigate(["listar"])
  }
  
  nuevo(){
    this.router.navigate(["agregar"])
  }

}
