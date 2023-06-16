import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { LaborDocente } from '../../Modelo/LaborDocente';

@Component({
  selector: 'app-labor-docente-listar',
  templateUrl: './labor-docente-listar.component.html',
  styleUrls: ['./labor-docente-listar.component.css']
})
export class LaborDocenteListarComponent {
  laborDocente: LaborDocente[]= [];
  constructor(private serviceService :ServiceService,private router: Router){


  }
  ngOnInit(): void {
    this.getLabores();

  }
  getLabores(){
    this.serviceService.getLabores().subscribe(
      (res: any) => {
        console.log(res); 
        this.laborDocente = res;
      },
      err => console.log(err)
    );
  }
  deleteLabor(id: number) {
    this.serviceService.deleteLabor(id).subscribe(
      () => {
        console.log("Usuario eliminado exitosamente");
        this.getLabores(); // Vuelve a cargar los usuarios después de eliminar uno

      },
      err => console.error(err)
    );
  }

}
