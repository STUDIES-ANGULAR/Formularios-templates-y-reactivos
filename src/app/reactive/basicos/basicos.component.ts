import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit{

  // miFormulario: FormGroup = new FormGroup({
  //   nombre    : new FormControl('Lavadora Samsung'),
  //   precio    : new FormControl(1800000),
  //   existencias: new FormControl(7),
  // });

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: [ , [Validators.required, Validators.minLength(3)]],
    precio: [ , [Validators.required, Validators.min(0)]],
    existencias: [ , [Validators.required, Validators.min(0)]],
  });

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Establecemos valores de entrada al formulario, evitamos errores que tendriamos con setValue por faltar existencias
    this.miFormulario.reset({
      nombre    : 'RTX 4080ti',
      precio    : 1600
    })

  }

  campoNoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched
  }

  guardar(){
    if(this.miFormulario.invalid){
      //Marcamos todos los campos como tocados para que en campoNoEsValido() se cumpla el touched
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}
