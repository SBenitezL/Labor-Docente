import { Component, OnInit, HostBinding} from '@angular/core';
import { LaborDocente } from '../../Modelo/LaborDocente';
import { ActivatedRoute, Router } from '@angular/router';
import { currentUser } from '../control-vista/control-vista.component';

import { ServiceService } from '../../Service/service.service';

@Component({
  selector: 'app-labor-docente-agregar',
  templateUrl: './labor-docente-agregar.component.html',
  styleUrls: ['./labor-docente-agregar.component.css']
})
export class LaborDocenteAgregarComponent {
  @HostBinding('class')classes= 'row'
  laborDocente:LaborDocente={
    LAB_ID:0,
    TL_ID:0,
    LAB_NOMBRE:'',
    LAB_HORAS:0,

  };

  edit : boolean =false;
  seleccionTipoLab : string = "";
  constructor(private serviceService: ServiceService,private router:Router,private activeRouter:ActivatedRoute){
    

  }
  ngOnInit(): void {
   
    const params = this.activeRouter.snapshot.params;
    if (params['id']) {
      this.serviceService.getLabor(params['id']).subscribe(
        res => {
          console.log(res);
          Object.assign(this.laborDocente, res);
          this.edit = true;
        },
        err => console.error(err)
      );
    }
  }
  
  auxIdentificacion : string = '';
  auxHoras : string= '';
  laborAgregado: boolean = false;
  mostrar: boolean = false;
  saveNewLabor(){
    this.laborDocente.LAB_ID = parseInt(this.auxIdentificacion);
    this.laborDocente.LAB_HORAS = parseInt(this.auxHoras);
    this.serviceService.saveLabor(this.laborDocente)
    .subscribe(
      res =>{
        this.mostrar = true;
        console.log(res);
        this.laborAgregado = true;
      },
      err =>console.error(err)
    )
  }

  updateLabor(){
    console.log(this.laborDocente);
    this.serviceService.updateLabor(this.laborDocente.LAB_ID,this.laborDocente);
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
  cerrarModal() {
    this.mostrar = false;
    this.router.navigate(['/listarL']);
  }
  IrPeriodo()
  {
    this.router.navigate(['/periodo']);
  }
}
