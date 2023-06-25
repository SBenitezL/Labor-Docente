import { Component } from '@angular/core';
import { PeriodoUtil } from 'src/app/Modelo/PeriodoUtil';
import { currentUser } from '../control-vista/control-vista.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';
import { Mensaje } from 'src/app/Modelo/Mensaje';

@Component({
  selector: 'app-periodo-form',
  templateUrl: './periodo-form.component.html',
  styleUrls: ['./periodo-form.component.css']
})
export class PeriodoFormComponent {
  periodo:PeriodoUtil={
    PER_ID: 0,
    PER_NOMBRE: "",
    PER_FECHAINICIO: new Date(),
    PER_FECHAFIN: new Date()
  }
  active:boolean = false
  edit:number = 0;
  constructor(private evaluacionServices:ServiceService, private router:Router,  private activatedRoute:ActivatedRoute){
    this.onInit();
  }
  onInit(){
    const params = this.activatedRoute.snapshot.params;
    this.edit = params["id"];
    if(this.edit){
      this.active = true;
      this.recuperarPeriodo();
      console.log(this.edit);
      console.log(this.active);
    }
  }

  recuperarPeriodo(){
    this.evaluacionServices.getPeriodoEdit(this.edit).subscribe(
      res=>{
        console.log(res);
        this.periodo = res as PeriodoUtil;
      },
      err=>console.log(err)
    );
    
  }
  editar(){
    this.evaluacionServices.updatePeriodo(this.periodo).subscribe(
      res=>{
        const mensaje:Mensaje = res as Mensaje;
        Swal.fire(
          mensaje.message,
          'info'
        )
        this.router.navigate([`/periodo`]);
      },
      err=>console.log(err)
    );
  }

  insertar(){
    this.evaluacionServices.insertPeriodo(this.periodo).subscribe(
      res =>{
        const mensaje:Mensaje = res as Mensaje;
        Swal.fire({
          text:mensaje.message,
          icon: "info"
        }
        
        )
        this.router.navigate([`/periodo`]);
      },
      err => console.log(err)
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
  IrPeriodo(){
    this.router.navigate(['/periodo']);
  }
  IrInicio(){
    this.router.navigate([`/menuCoordinador/${currentUser.getCurrent()}`]);
  }

}
