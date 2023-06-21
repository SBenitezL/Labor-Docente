import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Evaluacion } from 'src/app/Modelo/Evaluacion';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  evaluaciones: Evaluacion[] = [];

  constructor(private activeRouter: ActivatedRoute, private serviceService: ServiceService, private router: Router) { }

  ngOnInit() {
    this.getEvaluacion();
  }

  getEvaluacion() {
    const id = this.activeRouter.snapshot.params['id'];
    if (id) {
      this.serviceService.getEvaluacion(id).subscribe(
        (res: any) => {
          console.log(res);
          this.evaluaciones = res;
        },
        err => console.error(err)
      );
    }
  }
}


