import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //TODO: Temporal
  nombreApellidoPattern: string = "([a-zA-Z]+) ([a-zA-Z]+)";
  emailPattern         :string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"; 

  noPuedeSerArley( control: FormControl){
    const valor: string = control.value?.trim().toLowerCase();
    if(valor === 'arley'){
       return {
         noArley: true
       }
    }
    return null; //los null en validaciones es no hay error
  }

  constructor( private formBuilder: FormBuilder) { }

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern(this.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    username: ['', [Validators.required, this.noPuedeSerArley]]
  })


  ngOnInit(): void {
     this.miFormulario.reset({
       nombre: 'Arley Rivas',
       email: 'emailprueba@test.com',
       username: 'arley_rg'
     })
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
