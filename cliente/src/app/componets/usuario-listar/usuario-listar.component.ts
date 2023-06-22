import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { Usuario } from '../../Modelo/Usuario';
import { currentUser } from '../control-vista/control-vista.component';
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
  mostrar: boolean = false;

  deleteUsuario(id: number) {
    this.serviceService.deleteUsuario(id).subscribe(
      () => {
        this.mostrar = true;
        console.log("Usuario eliminado exitosamente");
        this.getUsuarios(); // Vuelve a cargar los usuarios después de eliminar uno

      },
      err => console.error(err)
    );
  }
  confirmarEliminarUsuario(id: number) {
    const confirmacion = window.confirm('¿Está seguro de que desea eliminar este usuario?');
    if (confirmacion) {
      this.deleteUsuario(id);
    }
  }
  

  irALabor() {
    this.router.navigate(['/listarL']);
  }
  nuevo() {
    this.router.navigate(['/agregar']);
  }
  
  IrGestionLabor() {
    this.router.navigate(['/listarL']);
  }
  IrEvaluacion() {
    this.router.navigate([`/coordinador/${currentUser.getCurrent()}`]);
  }
  editarUsuario(id: number){
    console.log(id);
    this.router.navigate(['/editar/'+id]);
  }
  IrInicio(){
    this.router.navigate([`/menuCoordinador/${currentUser.getCurrent()}`]);
  }
  IrGestionEvaluacion() {
    this.router.navigate(['/evaluacion']);
  }
  cerrarModal() {
    this.mostrar = false;
  }
}
