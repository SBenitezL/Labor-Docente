import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionEdit } from 'src/app/Modelo/EvaluacionEdit';
import { EvaluacionEst } from 'src/app/Modelo/EvaluacionEstructura';
import { LaborUtil } from 'src/app/Modelo/LaborUtill';
import { PeriodoUtil } from 'src/app/Modelo/PeriodoUtil';
import { UseRolUtil } from 'src/app/Modelo/UseRolUtil';
import { ServiceService } from 'src/app/Service/service.service';
import { currentUser } from '../control-vista/control-vista.component';

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
    ROL_ID: 0,
    EVA_ESTADO: 1
  };
  evaluacionEdit:EvaluacionEdit={
    LAB_ID: 0,
    LAB_NOMBRE: "",
    USR_ID: 0,
    USR_NOMBRE: "",
    ROL_ID: 0,
    ROL_NAME: "",
    PER_ID:  0,
    PER_NOMBRE: "",
    EVA_ESTADO: 0,
    EVA_RESULTADO: "",
    EVA_PUNTAJE:0,
    EVA_ID:0
  }

  usuarios:UseRolUtil[]=[];
  labores:LaborUtil[]=[];
  periodos:PeriodoUtil[]=[];
  bandera:boolean =false;
  edit:boolean = false;
  seleccion:UseRolUtil={
    Nombre:"",
    Rol:"",
    Id:0,
    RolID:0
  };
  estados: { [key: number]: string } = {
    1: "Ejecución",
    2: "Terminado",
    3: "Suspendido",
  };
  estadoForm= [1,2,3];
  evaEdit:number = 0;
  constructor(private evaluacionServices:ServiceService, private router:Router, private activatedRoute:ActivatedRoute){

  }
  async ngOnInit(){
    await this.cargarFormulario();
    const params = this.activatedRoute.snapshot.params;
    this.evaEdit = params["id"];
    console.log(params);
    if(this.evaEdit){
      this.evaluacionServices.getToEditEvaluacion(params["id"]).subscribe(
        (res:any)=>{          
          this.evaluacionEdit = res[0];          
          this.edit = true;
          this.evaluacion.LAB_ID = this.evaluacionEdit.LAB_ID;
          this.evaluacion.PER_ID = this.evaluacionEdit.PER_ID;          
          this.evaluacion.ROL_ID = this.evaluacionEdit.ROL_ID;          
          this.evaluacion.USR_IDENTIFICACION = this.evaluacionEdit.USR_ID;           
          for (let i = 0; i < this.estadoForm.length ; i++)
          {
            if(this.evaluacionEdit.EVA_ESTADO == this.estadoForm[i])
            {
              this.evaluacion.EVA_ESTADO = this.estadoForm[i];
              break;
            }
          }
          for(let i = 0; i < this.usuarios.length; i++)
          {
            if(this.usuarios[i].Id == this.evaluacionEdit.USR_ID && this.usuarios[i].RolID == this.evaluacionEdit.ROL_ID)
            {
              this.seleccion = this.usuarios[i];
              break;
            }
          }
        },
        err=>console.log(err)
      );
      this.getEstadosKeys();
    }
  }
  getEstadosKeys(){
    console.log(Object.keys(this.estados));
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
    this.evaluacionServices.updateEvaluacion(this.evaEdit, this.evaluacion).subscribe(
      res =>{
        
        console.log(res);
        
        this.bandera = true;
        this.router.navigate(['/evaluacion']);
      },
      err =>console.error(err)
    )
  }
  mostrar: boolean = false;
  saveEvaluacion()
  {
    this.evaluacion.USR_IDENTIFICACION = this.seleccion.Id
    this.evaluacion.ROL_ID = this.seleccion.RolID;
    console.log(this.evaluacion);
    this.mostrar = true;
    this.evaluacionServices.saveEvaluacion(this.evaluacion).subscribe(
      res =>{
        
        console.log(res);
        this.bandera = true;
        this.router.navigate(['/evaluacion']);
      },
      err =>console.error(err)
    )
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
  cerrarModal() {
    this.mostrar = false;
  }
}
