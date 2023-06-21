import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { ServiceService } from '../../Service/service.service';

@Component({
  selector: 'app-middleware',
  templateUrl: './middleware.component.html',
  styleUrls: ['./middleware.component.css']
})
export class MiddlewareComponent {


  constructor(private serviceService: ServiceService,
    private router: Router,
    private activeRouter: ActivatedRoute)
  {}

  verificarVistaMenuPrincipal(rol:number,userId:number){
    if(rol==2){
      this.router.navigate([`/menuCoordinador/${userId}`]);
    }else if(rol==3 || rol==4 || rol==5){
      this.router.navigate([`/docente/${userId}`]);
      }
  }

}
