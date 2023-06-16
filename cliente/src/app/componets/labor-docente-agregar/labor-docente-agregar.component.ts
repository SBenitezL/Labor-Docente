import { Component, OnInit, HostBinding} from '@angular/core';
import { LaborDocente } from '../../Modelo/LaborDocente';
import { ActivatedRoute, Router } from '@angular/router';

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
    LAB_NOMBRE:'string',
    LAB_HORAS:0,

  };

  edit : boolean =false;
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
  
  
  laborAgregado: boolean = false;
  saveNewLabor(){
    
    this.serviceService.saveLabor(this.laborDocente)
    .subscribe(
      res =>{
        console.log(res);
        
        this.laborAgregado = true;
        this.router.navigate(['/listar']);
      },
      err =>console.error(err)
    )
  }

  updateLabor(){
    console.log(this.laborDocente);
    this.serviceService.updateLabor(this.laborDocente.LAB_ID,this.laborDocente);
  }

}
