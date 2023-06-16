import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-coordinador',
  templateUrl: './menu-coordinador.component.html',
  styleUrls: ['./menu-coordinador.component.css']
})
export class MenuCoordinadorComponent {
  constructor(private router:Router){
  }
  ngOnInit(): void {

  }
  IrGestionDocente() {
    this.router.navigate(['/listar']);
  }
  IrGestionLabor() {
    this.router.navigate(['/listarL']);
  }
  IrEvaluacion() {
    this.router.navigate(['/listarL']);
  }
  
}
