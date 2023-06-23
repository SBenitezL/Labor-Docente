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
  estados: { [key: number]: string } = {
    1: "Docencia",
    2: "Trabajos Docencia",
    3: "Proyectos Investigación",
    4: "Trabajos Investigaciónspendido",
    5: "Administración",
    6: "Asesoría",
    7: "Servición",
    8: "Extención",
    9: "Capacitación",
    10: "Otros servicios",
  };
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
  mostrar: boolean = false;
  deleteLabor(id: number) {
    this.mostrar = true;
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
  getEstado(state:number)
  {
    return this.estados[state];
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
    this.router.navigate([`/coordinador/${currentUser.getCurrent()}`]);
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
  IrPeriodo()
  {
    this.router.navigate(['/periodo']);
  }
}
