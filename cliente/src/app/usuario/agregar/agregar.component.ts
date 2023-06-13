import { Component, OnInit, HostBinding} from '@angular/core';
import { Usuario } from 'src/app/Modelo/Usuario';

import { ServiceService } from 'src/app/Service/service.service';
@Component({
  selector: 'app-agregar',  
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  @HostBinding('class')classes= 'row'

  usuario:Usuario={
    USR_IDENTIFICACION: 0,
    USU_NOMBRE: '',
    USU_APELLIDO: '',
    USU_GENERO: '',
    USU_ESTUDIO: ''
  
  };
  constructor(private usuarioService: ServiceService ){

  }
  ngOnInit(): void {
      
  }
  saveNewUsuario(){
    this.usuarioService.saveUsuario(this.usuario)
    .subscribe(
      res =>{
        console.log(res);
      },
      err =>console.error(err)
    )
  }

}
