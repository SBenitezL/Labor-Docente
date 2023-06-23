import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Evaluacion } from 'src/app/Modelo/Evaluacion';
import { Usuario } from 'src/app/Modelo/Usuario';
import { currentUser } from '../control-vista/control-vista.component';
import { EvaluacionEdit } from 'src/app/Modelo/EvaluacionEdit';


@Component({
  selector: 'app-coordinador',
  templateUrl: './coordinador.component.html',
  styleUrls: ['./coordinador.component.css']
})
export class CoordinadorComponent implements OnInit{
  evaluaciones: Evaluacion[] = [];
  evaluacionEdita : EvaluacionEdit[]=[]

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
    EVA_ID:0,
  }
  usuario: Usuario  = {
    USR_IDENTIFICACION: 0,
    USU_NOMBRE: '',
    USU_APELLIDO: '',
    USU_GENERO: '',
    USU_ESTUDIO: '',
    UserName: '',
    USR_Contrasenia: '' 
  };
  bandera:boolean =false;
  edit:boolean = false; 

  constructor(private elementRef: ElementRef,private activeRouter: ActivatedRoute, private serviceService: ServiceService, private router: Router) { }
  estados: { [key: number]: string } = {
    1: "Ejecución",
    2: "Terminado",
    3: "Suspendido",
  };
  estadoForm= [1,2,3];
  ngOnInit() {
    const id = currentUser.getCurrent();
    console.log('Valor de id :', id); 

      this.serviceService.getUsuario(id).subscribe(
        (res: any) => {
          console.log(res);
          this.usuario = Object.assign({}, res) as Usuario ;
          this.edit = true;
        },
        err => console.error(err)
      );

      if (id) {
        console.log("entra"+id)
          this.serviceService.getEvaluacion(id).subscribe(
            (res: any) => {
              console.log(res);
              if (res && res.length > 0) {
                this.evaluaciones= res;
                this.evaluacionEdit = res[0]; 
                
                console.log(this.evaluacionEdit);
                this.edit = true;
              } else {
                console.log('La respuesta no contiene ningún objeto EvaluacionEdit');
              }
            },
            err => console.error(err)
          );
      }
    
  }
  

    
  updateOwnEvaluacion(inst:Evaluacion)
  {
    console.log(this.evaluacionEdit.EVA_ID)
    this.evaluacionEdit.EVA_ID= inst.ID;
    this.evaluacionEdit.EVA_RESULTADO=inst.Resultado;
    this.evaluacionEdit.EVA_PUNTAJE= inst.Puntaje;
    console.log(this.evaluacionEdit);
    this.serviceService.updateOwnEvaluacion(this.evaluacionEdit).subscribe(
      res => {
        console.log(res);
        
        this.bandera = true;
        this.router.navigate(['/evaluacion']);
      },
      err => console.error(err)
    );
  }
  
  formatFecha(fecha: string | Date): string {
    if (typeof fecha === 'string') {
      fecha = new Date(fecha);
    }
    const formattedDate = fecha.toISOString().split('T')[0];
    return formattedDate;
  }
  getEstadosKeys(){
    console.log(Object.keys(this.estados));
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
  IrGestionEvaluacion() {
    this.router.navigate(['/evaluacion']);
  }

}
