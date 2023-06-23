  import { Component, OnInit, ElementRef } from '@angular/core';
  import { ActivatedRoute, Router} from '@angular/router';
  import { ServiceService } from 'src/app/Service/service.service';
  import { EvaluacionEdit } from 'src/app/Modelo/EvaluacionEdit';
  import { Evaluacion } from 'src/app/Modelo/Evaluacion';
  import { Usuario } from 'src/app/Modelo/Usuario';
  import { UseRol } from '../../Modelo/UseRol';
  import { HttpClient } from '@angular/common/http';


  import { currentUser } from 'src/app/componets/control-vista/control-vista.component';
  @Component({
    selector: 'app-docente',
    templateUrl: './docente.component.html',
    styleUrls: ['./docente.component.css']
  })

  export class DocenteComponent implements OnInit {
    rol=0;
    evaluaciones : Evaluacion[]=[]
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
      EVA_ID:0
    }
    usuario: Usuario & UseRol = {
      USR_IDENTIFICACION: 0,
      USU_NOMBRE: '',
      USU_APELLIDO: '',
      USU_GENERO: '',
      USU_ESTUDIO: '',
      UserName: '',
      USR_Contrasenia: '',
      ROL_ID: 0,
      UR_FECHAINICIO: new Date(),
      UR_FECHAFIN: new Date(),
    
    };

    bandera:boolean =false;
    edit:boolean = false; 
    archivoSeleccionado: File | null = null;
    
    constructor(private http: HttpClient,private elementRef: ElementRef,private router: Router,private activeRouter: ActivatedRoute, private serviceService: ServiceService) { }
    estados: { [key: number]: string } = {
      1: "Ejecución",
      2: "Terminado",
      3: "Suspendido",
    };
    estadoForm= [1,2,3];
    ngOnInit() {
      
      const id = currentUser.getCurrent();
      this.serviceService.getUsuario(id).subscribe(
        (res: any) => {
          console.log(res);
          this.usuario = Object.assign({}, res) as Usuario & UseRol;
          this.edit = true;
        },
        err => console.error(err)
      );
      this.rol=this.usuario.ROL_ID;
      if (id) {
        console.log("entra"+id)
          this.serviceService.getEvaluacion(id).subscribe(
            (res: any) => {

              console.log(res);
              this.evaluaciones = res;
              this.edit = true;
            },
            err => console.error(err)
          );
      }
      
      
      
    }
    
    guardarEvaluacion() {
      const input1 = this.elementRef.nativeElement.querySelectorAll('.octavoI');
      const input2 = this.elementRef.nativeElement.querySelectorAll('.novenoI');

      const valoresColumna1: string[] = [];
      const valoresColumna2: string[] = [];

      input1.forEach((input: HTMLInputElement) => {
        valoresColumna1.push(input.value);
      });
    
      // Realiza acciones con los valores capturados
      console.log(valoresColumna1);
      input2.forEach((input: HTMLInputElement) => {
        valoresColumna2.push(input.value);
      });
    
      // Realiza acciones con los valores capturados
      console.log(valoresColumna2);
    
      // Aquí puedes realizar acciones adicionales, como asignar los valores capturados a la evaluación editada o llamar a un método para procesarlos.
    }
    
    
    updateOwnEvaluacion()
    {
      console.log(this.evaluacionEdit.EVA_ID)
      this.serviceService.updateOwnEvaluacion(this.evaluacionEdit).subscribe(
        res =>{
          
          console.log(res);
          
          this.bandera = true;
          this.router.navigate(['/evaluacion']);
        },
        err =>console.error(err)
      )
    }
    

  onArchivoSeleccionado(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  guardarArchivo() {
    if (this.archivoSeleccionado) {
      const nombreArchivo = this.archivoSeleccionado.name;
      const tipoArchivo = this.archivoSeleccionado.type;

      const formData = new FormData();
      formData.append('archivo', this.archivoSeleccionado);
      formData.append('nombre', nombreArchivo);
      formData.append('tipo', tipoArchivo);

      this.http.post('/guardar-archivo', formData).subscribe(
        () => {
          console.log('Archivo enviado correctamente');
          // Realizar las acciones necesarias después de enviar el archivo
        },
        error => {  
          console.error('Error al enviar el archivo:', error);
          // Manejar el error de manera adecuada
        }
      );
    }
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
