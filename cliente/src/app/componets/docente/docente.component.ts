import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { EvaluacionEdit } from 'src/app/Modelo/EvaluacionEdit';
import { Evaluacion } from 'src/app/Modelo/Evaluacion';
import { Usuario } from 'src/app/Modelo/Usuario';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  evaluacion:Evaluacion={
    NombreCompleto:'',
    Rol:'',
    ID:0,    
    Nombre:'',
    Horas:0,
    Inicio:new Date(),
    Fin:new Date(),
    Estado:0,
    Puntaje:0,
    Resultado:'',
    TipoLabor:'',
    PER_NOMBRE:''
}
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

  constructor(private router: Router,private activeRouter: ActivatedRoute, private serviceService: ServiceService) { }
  estados: { [key: number]: string } = {
    1: "Ejecución",
    2: "Terminado",
    3: "Suspendido",
  };
  estadoForm= [1,2,3];
  ngOnInit() {
    const id = this.activeRouter.snapshot.params['id'];
    console.log('Valor de id:', id);

    if (id) {
        this.serviceService.getEvaluacion(id).subscribe(
          (res: any) => {
            console.log(res);
            this.evaluacionEdit = res as EvaluacionEdit;
            this.edit = true;
          },
          err => console.error(err)
        );
    }
    this.serviceService.getEvaluacion(id).subscribe(
      (res: any) => {
        console.log(res);
        this.evaluacion = res;
      },
      err => console.error(err)
    );
  }
  

  updateOwnEvaluacion()
  {
    this.serviceService.updateOwnEvaluacion(this.evaluacionEdit).subscribe(
      res =>{
        
        console.log(res);
        
        this.bandera = true;
        this.router.navigate(['/evaluacion']);
      },
      err =>console.error(err)
    )
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
}
