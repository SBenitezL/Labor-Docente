import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-labor-docente',
  templateUrl: './labor-docente.component.html',
  styleUrls: ['./labor-docente.component.css']
})
export class LaborDocenteComponent {
  constructor(private router:Router){
    this.router.navigate(["listarL"])
  }
  
  nuevo(){
    this.router.navigate(["agregarL"])
  }

}
