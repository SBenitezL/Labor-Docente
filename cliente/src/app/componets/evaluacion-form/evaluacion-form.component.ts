import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionEdit } from 'src/app/Modelo/EvaluacionEdit';
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
  evaluacionEdit:EvaluacionEdit={
    LAB_ID: 0,
    LAB_NOMBRE: "",
    USR_ID: 0,
    USR_NOMBRE: "",
    ROL_ID: 0,
    PER_ID:  0,
    PER_NOMBRE: ""
  }

  usuarios:UseRolUtil[]=[];
  labores:LaborUtil[]=[];
  periodos:PeriodoUtil[]=[];
  bandera:boolean =false;
  seleccion:UseRolUtil={
    Nombre:"",
    Rol:"",
    Id:0,
    RolID:0
  };

  constructor(private evaluacionServices:ServiceService, private router:Router, private activatedRoute:ActivatedRoute){

  }
  ngOnInit(){
    this.cargarFormulario();
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if(params["id"]){
      this.evaluacionServices.getToEditEvaluacion(params["id"]).subscribe(
        (res:any)=>{
          this.evaluacionEdit = res[0];          
          this.evaluacion.LAB_ID = this.evaluacionEdit.LAB_ID;
          this.evaluacion.PER_ID = this.evaluacionEdit.PER_ID;          
          this.evaluacion.ROL_ID = this.evaluacionEdit.ROL_ID;          
          this.evaluacion.USR_IDENTIFICACION = this.evaluacionEdit.USR_ID;
          this.seleccion.Id = this.evaluacionEdit.USR_ID;
          this.seleccion.RolID = this.evaluacion.ROL_ID;
          this.seleccion.Nombre = this.evaluacionEdit.USR_NOMBRE;
          this.seleccion.Rol = "aaa";
          console.log(this.evaluacionEdit);
        },
        err=>console.log(err)
      );
    }
  }
  cargarValores():void{

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
  updateEvaluacion()
  {
    console.log(this.evaluacion);
  }
  saveEvaluacion()
  {
    console.log(this.seleccion);
    this.evaluacion.USR_IDENTIFICACION = this.seleccion.Id
    this.evaluacion.ROL_ID = this.seleccion.RolID;
    console.log(this.evaluacion);
    this.evaluacionServices.saveEvaluacion(this.evaluacion).subscribe(
      res =>{
        console.log(res);
        
        this.bandera = true;
        this.router.navigate(['/evaluacion']);
      },
      err =>console.error(err)
    )
  }
}
