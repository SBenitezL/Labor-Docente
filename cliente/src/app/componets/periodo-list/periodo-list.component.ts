import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { currentUser } from '../control-vista/control-vista.component';

@Component({
  selector: 'app-periodo-list',
  templateUrl: './periodo-list.component.html',
  styleUrls: ['./periodo-list.component.css']
})
export class PeriodoListComponent {

  constructor(private router:Router)
  {
    
  }

  IrGestionDocente() {
    this.router.navigate(['/listar']);
  }
  IrGestionLabor() {
    this.router.navigate(['/listarL']);
  }
  IrEvaluacion() {
    this.router.navigate(['/coordinador/'+currentUser.getCurrent()]);
  }

  IrGestionEvaluacion() {
    this.router.navigate(['/evaluacion']);
  }
  IrPeriodo()
  {
    this.router.navigate(['/periodo']);
  }
  AgregarPeriodo()
  {
    this.router.navigate(['/periodo/add']);
  }
}
