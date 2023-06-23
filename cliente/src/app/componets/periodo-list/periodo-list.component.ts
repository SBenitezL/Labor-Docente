import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { currentUser } from '../control-vista/control-vista.component';
import { PeriodoUtil } from 'src/app/Modelo/PeriodoUtil';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-periodo-list',
  templateUrl: './periodo-list.component.html',
  styleUrls: ['./periodo-list.component.css']
})
export class PeriodoListComponent {

  periodos:PeriodoUtil[]=[]
  constructor(private router:Router, private periodoServices:ServiceService)
  {
    this.getRows();
  }
  getRows(){
    this.periodoServices.getPeriodos().subscribe(
      res=>{
        console.log(res);
        this.periodos = res as PeriodoUtil[];
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
  IrInicio(){
    this.router.navigate([`/menuCoordinador/${currentUser.getCurrent()}`]);
  }
}
