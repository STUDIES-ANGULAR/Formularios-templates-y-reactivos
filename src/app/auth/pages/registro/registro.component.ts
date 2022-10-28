import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailPattern, nombreApellidoPattern, noPuedeSerArley } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //TODO: Temporal
  nombreApellidoPattern: string = "([a-zA-Z]+) ([a-zA-Z]+)";
  emailPattern         :string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"; 


 
 

  // //FORMA #1: Validaciones desde un archivo .ts
  // miFormulario: FormGroup = this.formBuilder.group({ 
  //   nombre: ['', [Validators.required, Validators.pattern(nombreApellidoPattern)]],
  //   email: ['', [Validators.required, Validators.pattern(emailPattern)]],
  //   username: ['', [Validators.required, noPuedeSerArley]]
  // })

  //FORMA #2: Validaciones desde un servicio
  miFormulario: FormGroup = this.formBuilder.group({
  // Campo:   ['Valor del campo',[validaciones sincronas], [validaciones asincronas]],
    nombre:   ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern ) ] ],
    email:    ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern ) ], [this.emailValidator] ],
    username: ['', [Validators.required, this.validatorService.noPuedeSerArley ] ],
    password: ['', [Validators.required, Validators.minLength(6) ] ],
    password2:['', [Validators.required ] ],
  },{
      Validators:  this.validatorService.camposIguales('password','password2') 
  });

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if( errors?.['required']){
      return 'Email es obligatorio.';
    }
    if(errors?.['pattern']){
      return 'El correo no tiene formato valido.';
    }
    if(errors?.['emailTomado']){
      return 'El correo ya fue usado.'
    }    
    return '';
  }
  constructor( private formBuilder     : FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator  : EmailValidatorService) { }


  ngOnInit(): void {
     this.miFormulario.reset({
       nombre: 'Arley Rivas',
       email: 'test1@test.com',
       username: 'arley_rg',
       password: '123456',
       password2: '123456'
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
