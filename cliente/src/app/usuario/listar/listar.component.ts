import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../Service/service.service';
import { Usuario } from 'src/app/Modelo/Usuario';
import { Router } from '@angular/router';



@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit{
  usuarios: Usuario[]= [];
  constructor(private serviceService :ServiceService,private router: Router){


  }
  ngOnInit(): void {
    this.getUsuarios();
      
  }
  getUsuarios(){
    this.serviceService.getUsuarios().subscribe(
      (res: any) => {
        console.log(res); 
        this.usuarios = res;
      },
      err => console.log(err)
    );
  }
  deleteUsuario(id: number) {
    this.serviceService.deleteUsuario(id).subscribe(
      () => {
        console.log("Usuario eliminado exitosamente");
        this.getUsuarios(); // Vuelve a cargar los usuarios después de eliminar uno
       
      },
      err => console.error(err)
    );
  } 
 


}
