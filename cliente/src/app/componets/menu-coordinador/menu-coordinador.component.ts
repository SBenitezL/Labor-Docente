import { Component ,OnInit} from '@angular/core';

import { Usuario } from '../../Modelo/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-menu-coordinador',
  templateUrl: './menu-coordinador.component.html',
  styleUrls: ['./menu-coordinador.component.css']
})

export class MenuCoordinadorComponent {
  
  constructor(private router:Router,private activeRouter: ActivatedRoute,private serviceService: ServiceService){
  
    
  
  }
  userIdG ='';
  ngOnInit(): void {
    
    
  
  }
  IrGestionDocente() {
    this.router.navigate(['/listar']);
  }
  IrGestionLabor() {
    this.router.navigate(['/listarL']);
  }
  IrEvaluacion() {
    console.log(this.userIdG);
    this.router.navigate(['/coordinador/'+this.userIdG]);
  }

  IrGestionEvaluacion() {
    this.router.navigate(['/evaluacion']);
  }
  
}
