import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable }  from 'rxjs/Rx';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma:FormGroup;

  usuario:Object = {
    nombre: "Julio",
    apellido: "Sarango",
    correo: "jsarangoq@gmail.com"
  }

  constructor(  ) {
    this.forma = new FormGroup({
      'nombre': new FormControl('', [
                                      Validators.required,
                                      Validators.minLength(3)
                                    ]),
      'apellido': new FormControl('', [Validators.required , this.controlApellido ]),
      'correo': new FormControl('', [
                                      Validators.required,
                                      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                    ]),
      'pasatiempos': new FormArray([
                     new FormControl('Comer', Validators.required),
                  //   new FormControl('Correr', Validators.required),
                  //   new FormControl('Dormir', Validators.required),
                                    ]),
      'username': new FormControl('',Validators.required, this.existeUsuario),
      'password1': new FormControl('',Validators.required),
      'password2': new FormControl(),
    });
    //de esta forma se puede cargar valores por defecto.
    //Otra forma es que en cada declaración de los campos se inicie como primer parámetro el valor respectivo
    //'nombre': new FormControl(usuario.nombre, [ ......

    //this.forma.setValue(this.usuario);

    //cuando hacemos las validaciones de esta forma, es necesario hacer el bind a la funcion que llamamos
    //debido a que this no está en el contexto donde se ejecuta la función.
    this.forma.controls['password2'].setValidators([
                                                      Validators.required,
                                                      this.verificarIguales.bind(this.forma)
                                                    ]);


   //escuchar los cambios en cualquier elemento del formulario
   /*
   this.forma.valueChanges
             .subscribe( data => {
                       console.log(data);
                     })

  */
  //escuchar los cambios de un campo específico
  this.forma.controls['username'].valueChanges
            .subscribe( data => {
              console.log(data);
            } )

  //escuchar el estado del forulario
  this.forma.controls['username'].statusChanges
            .subscribe( data => {
              console.log(data);
            } )



}
  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);

    //de esta forma se puede resetear el formulario a valores por defecto y a un estado incial
    //de pristine.
    //this.forma.reset(this.usuario);

  /*this.forma.reset( {
      nombre:"",
      apellido: "",
      correo: ""
    })*/

    //otra forma de setear informacion es
    //this.forma.controls['correo'].setValue('juio@julio.com');

    //console.log(this.forma);
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    )
  }

  ///creando controles personalizados
  //en este caso vamos a controlar que el apellido sea distinto de Sarango
  controlApellido(control:FormControl): {[s:string]:boolean} {

    if (control.value === 'sarango') {
      return {
        controlApellido:true
      };
    }

    return null;

  }

  verificarIguales(control:FormControl): { [s:string]:boolean } {
    let forma:any = this;
    if (control.value !== forma.controls['password1'].value) {
      return {
        verificarIguales:true
      }
    }

    return null;

  }

  existeUsuario(control:FormControl):Promise<any>|Observable<any> {
    let promesa = new Promise(
      ( resolve, reject ) => {
        setTimeout(() => {
          if (control.value === 'jsarangoq') {
            resolve( {existe:true})
          }else {
            resolve( null )
          }
        },3000)

      }
    )

    return promesa;

  }



}
