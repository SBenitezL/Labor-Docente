import { Component } from '@angular/core';
import { Evaluacion } from 'src/app/Modelo/Evaluacion';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { currentUser } from '../control-vista/control-vista.component';

@Component({
  selector: 'app-evaluacion-list',
  templateUrl: './evaluacion-list.component.html',
  styleUrls: ['./evaluacion-list.component.css']
})
export class EvaluacionListComponent {
  evaluaciones : Evaluacion[] = [];
  estados: { [key: number]: string } = {
    1: "Ejecución",
    2: "Terminado",
    3: "Suspendido",
  };
  constructor(private evaluacionServices:ServiceService, private router: Router)
  {
    
  }
  
  ngOnInit(){
    this.getEvaluaciones();
  }
  getEvaluaciones():void{
    this.evaluacionServices.getEvaluaciones().subscribe(
      (res:any)=> {
        console.log(res);
        this.evaluaciones = res;
      },
      err=>console.log(err)
    );
  }
  getEstado(state:number)
  {
    return this.estados[state];
  }
  nuevo()
  {
    this.router.navigate(['/evaluacion/add']);
  }
  deleteEvaluacion(evaID:number)
  {
    this.evaluacionServices.deleteEvaluacion(evaID).subscribe(
      (res:any)=> {
        console.log(res);
        this.getEvaluaciones();
      },
      err=>console.log(err)
    );
  }
  IrGestionDocente() {
    this.router.navigate(['/listar']);
  }
  IrGestionLabor() {
    this.router.navigate(['/listarL']);
  }
  IrInicio(){
    this.router.navigate([`/menuCoordinador/${currentUser.getCurrent()}`]);
  }
  IrEvaluacion() {
    this.router.navigate([`/coordinador/${currentUser.getCurrent()}`]);
  }
  IrPeriodo()
  {
    this.router.navigate(['/periodo']);
  }
}
