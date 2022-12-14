import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit{

  constructor( private formBuilder: FormBuilder) { }

  miFormulario: FormGroup = this.formBuilder.group({
    genero: [ 'M', Validators.required],
    notificaciones: [true, Validators.required],
    terminosYCondiciones: [false, Validators.requiredTrue], //requiredTrue obligamos a que debe ir seleccionado

  });

  persona ={
    genero: 'F',
    notificaciones: true,
  }
  ngOnInit(): void {
    this.miFormulario.reset({
      ...this.persona,  // al tener atributos iguales pasa sin problema
      terminosYCondiciones: false 
    });

    //cambiar datos en persona de manera reactiva al ser un formulario reactivo
    this.miFormulario.valueChanges.subscribe( ({condiciones, ...rest}) => {
      // delete form.terminosYCondiciones;
      this.persona = rest;
    });
  }

  guardar(){
    const formularioValue = {...this.miFormulario.value};
    delete formularioValue.terminosYCondiciones;
    this.persona = formularioValue; 
  }
}
