import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../Service/service.service';
import { Usuario } from 'src/app/Modelo/Usuario';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit{
  usuarios: Usuario[]= [];
  constructor(private serviceService :ServiceService){


  }
  ngOnInit(): void {
    this.serviceService.getUsuarios().subscribe(
      (res: any) => {
        console.log(res); 
        this.usuarios = res;
      },
      err => console.log(err)
    );
      
  }
}
