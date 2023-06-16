import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListarComponent } from './listar/listar.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  constructor(private router:Router){
    this.router.navigate(["listar"])
  }
  
  nuevo(){
    this.router.navigate(["agregar"])
  }
}
