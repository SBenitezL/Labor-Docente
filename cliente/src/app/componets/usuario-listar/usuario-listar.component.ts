import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { Usuario } from '../../Modelo/Usuario';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent {
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

  irALabor() {
    this.router.navigate(['/listarL']);
  }
  nuevo() {
    this.router.navigate(['/agregar']);
  }
  
  IrGestionDocente() {
    this.router.navigate(['/listar']);
  }
  IrGestionLabor() {
    this.router.navigate(['/listarL']);
  }
  IrEvaluacion() {
    this.router.navigate(['/listarL']);
  }
  editarUsuario(id: number){
    console.log(id);
    this.router.navigate(['/editar/'+id]);
  }
}
