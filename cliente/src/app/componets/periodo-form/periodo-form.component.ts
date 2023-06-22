import { Component } from '@angular/core';
import { PeriodoUtil } from 'src/app/Modelo/PeriodoUtil';
import { currentUser } from '../control-vista/control-vista.component';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';

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

  constructor(private evaluacionServices:ServiceService, private router:Router){

  }

  insertar(){
    this.evaluacionServices.insertPeriodo(this.periodo).subscribe(
      res =>{
        console.log(res);
        this.router.navigate([`/coordinador/${currentUser.getCurrent()}`]);
      },
      err => console.log(err)
    );
    
  }


}
