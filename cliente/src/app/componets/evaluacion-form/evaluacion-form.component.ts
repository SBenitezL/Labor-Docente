import { Component, HostBinding } from '@angular/core';
import { EvaluacionEst } from 'src/app/Modelo/EvaluacionEstructura';
import { LaborUtil } from 'src/app/Modelo/LaborUtill';
import { PeriodoUtil } from 'src/app/Modelo/PeriodoUtil';
import { UseRolUtil } from 'src/app/Modelo/UseRolUtil';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-evaluacion-form',
  templateUrl: './evaluacion-form.component.html',
  styleUrls: ['./evaluacion-form.component.css']
})
export class EvaluacionFormComponent {

  @HostBinding('class') clases = 'row';
  evaluacion:EvaluacionEst = {
    LAB_ID: 0,
    PER_ID: 0,
    USR_IDENTIFICACION: 0,
    ROL_ID: 0
  };

  usuarios:UseRolUtil[]=[];
  labores:LaborUtil[]=[];
  periodos:PeriodoUtil[]=[];

  constructor(private evaluacionServices:ServiceService){

  }
  ngOnInit(){
    this.cargarFormulario();
    console.log(this.labores);
    console.log(this.usuarios);
    console.log(this.periodos);
  }
  cargarFormulario():void
  {
    this.evaluacionServices.getLaborToAdd().subscribe(
      (res:any)=> {
        console.log(res);
        this.labores = res;
      },
      err=>console.log(err)
    );
    this.evaluacionServices.getUseRolToAdd().subscribe(
      (res:any)=> {
        console.log(res);
        this.usuarios = res;
      },
      err=>console.log(err)
    );
    this.evaluacionServices.getPeriodoToAdd().subscribe(
      (res:any)=> {
        console.log(res);
        this.periodos = res;
      },
      err=>console.log(err)
    );
  }
  saveEvaluacion()
  {
    console.log(this.evaluacion);
  }
}
