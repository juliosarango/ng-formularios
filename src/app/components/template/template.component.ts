import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [

  ]
})
export class TemplateComponent implements OnInit {

  usuario:Object = {
    nombre: null,
    apellido: null,
    email: null,
    pais:"",
    sexo: null,
    acepta: null
  }

  paises = [
    { codigo: "EC",
      nombre: "Ecuador"
    },
    { codigo: "COL",
      nombre: "Colombia"
    },
    { codigo: "AR",
      nombre: "Argentina"
    },
  ]

  sexos:string[] = ["Hombre","Mujer","ND"];

  constructor() { }

  ngOnInit() {
  }

  guardar(forma:NgForm) {
    console.log('formulario posteado');
    console.log("NgForm: ", forma);
    console.log("Value: ",forma.value);
  }

}
