import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { LaborDocente } from '../../Modelo/LaborDocente';
import { currentUser } from '../control-vista/control-vista.component';


@Component({
  selector: 'app-labor-docente-listar',
  templateUrl: './labor-docente-listar.component.html',
  styleUrls: ['./labor-docente-listar.component.css']
})
export class LaborDocenteListarComponent {
  laborDocente: LaborDocente[]= [];
  constructor(private serviceService :ServiceService,private router: Router){


  }
  ngOnInit(): void {
    this.getLabores();

  }
  getLabores(){
    this.serviceService.getLabores().subscribe(
      (res: any) => {
        console.log(res); 
        this.laborDocente = res;
      },
      err => console.log(err)
    );
  }
  deleteLabor(id: number) {
    this.serviceService.deleteLabor(id).subscribe(
      () => {
        console.log("Labor eliminada exitosamente");
        this.getLabores(); // Vuelve a cargar los usuarios después de eliminar uno

      },
      err => console.error(err)
    );
  }
  confirmarEliminarLabor(id: number) {
    const confirmacion = window.confirm('¿Está seguro de que desea eliminar la Labor?');
    if (confirmacion) {
      this.deleteLabor(id);
    }
  }
  
  editarLabor(id: number){
    console.log(id);
    this.router.navigate(['/editarL/'+id]);
  }
  nuevo() {
    this.router.navigate(['/agregarL']);
  }
  IrGestionDocente() {
    this.router.navigate(['/listar']);
  }
 
  IrEvaluacion() {
    this.router.navigate(['/listarL']);
  }
  IrInicio(){
    this.router.navigate([`/menuCoordinador/${currentUser.getCurrent()}`]);
  }
}
