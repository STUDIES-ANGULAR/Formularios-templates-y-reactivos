import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //TODO: Temporal
  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';



  constructor( private formBuilder: FormBuilder) { }

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern(this.nombreApellidoPattern)]],
    // email: ['', [Validators.email, Validators.required]],
    // userName: ['', [Validators.required]]
  })


  ngOnInit(): void {
   
  }

  campoNoValido(campo: string){
   return this.miFormulario.get(campo)?.invalid 
            &&  this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  } 

}
