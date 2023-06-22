import { Component,OnInit } from '@angular/core';
import { LaborDocente } from '../../Modelo/LaborDocente';
import { ActivatedRoute, Router } from '@angular/router';
import { currentUser } from '../control-vista/control-vista.component';

import { ServiceService } from '../../Service/service.service';
@Component({
  selector: 'app-labor-docente-editar',
  templateUrl: './labor-docente-editar.component.html',
  styleUrls: ['./labor-docente-editar.component.css']
})
export class LaborDocenteEditarComponent implements OnInit{
  laborDocente:LaborDocente={
    LAB_ID:0,
    TL_ID:0,
    LAB_NOMBRE:'',
    LAB_HORAS:0,

  };
  edit: boolean = false;
  seleccionTipoLab ='';
  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activeRouter.snapshot.params;
    if (params['id']) {
      this.serviceService.getLabor(params['id']).subscribe(
        res => {
          console.log(res);
          this.laborDocente = Object.assign({}, res) as LaborDocente ;
          console.log(this.laborDocente);
          this.edit = true;
        },
        err => console.error(err)
      );
    }
  }

  seleccionarTipoLabor(){
    console.log(this.seleccionTipoLab);
    if(this.seleccionTipoLab=="opt1"){
      this.laborDocente.TL_ID=1;
    } else if(this.seleccionTipoLab=="opt2"){
      this.laborDocente.TL_ID=2;
    } else if(this.seleccionTipoLab=="opt3"){
      this.laborDocente.TL_ID=3;
    }else if(this.seleccionTipoLab=="opt4"){
        this.laborDocente.TL_ID=4;
    }else if(this.seleccionTipoLab=="opt5"){
        this.laborDocente.TL_ID=5;
    }else if(this.seleccionTipoLab=="opt6"){
        this.laborDocente.TL_ID=6;
   }else if(this.seleccionTipoLab=="opt7"){
        this.laborDocente.TL_ID=7;
   }else if(this.seleccionTipoLab=="opt8"){
        this.laborDocente.TL_ID=8;
    }else if(this.seleccionTipoLab=="opt9"){
        this.laborDocente.TL_ID=9;
    }else{
      this.laborDocente.TL_ID=10;
    }

    console.log(this.laborDocente.TL_ID);
  }
  obtenerId(): number {
    return this.laborDocente.LAB_ID;
  }

  updateLabor(): void {
    console.log(this.laborDocente.LAB_ID);
    this.serviceService.updateLabor(
      this.laborDocente.LAB_ID,
      this.laborDocente
    ).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/listarL']);
      },
      err => console.error(err)
    );
  }


  IrGestionDocente() {
    this.router.navigate(['/listar']);
  }
  IrGestionLabor() {
    this.router.navigate(['/listarL']);
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
}


