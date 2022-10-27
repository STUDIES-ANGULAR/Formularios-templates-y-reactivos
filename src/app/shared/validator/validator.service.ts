import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }



  public nombreApellidoPattern: string = "([a-zA-Z]+) ([a-zA-Z]+)";
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  noPuedeSerArley(control: FormControl): ValidationErrors | null {
    const valor: string = control.value?.trim().toLowerCase();
    if (valor === 'arley') {
      return {
        noArley: true
      }
    }
    return null; //los null en validaciones es no hay error
  }

  camposIguales( campo1: string, campo2: string){
   
    //retornamos una función ya que en el Validators solo se manda la referencia (no se invoca la función camposIguales)     
    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      //  console.log(formGroup);
      const pass1: string = formGroup.get(campo1)?.value;
      const pass2: string = formGroup.get(campo2)?.value;

       if(pass1 !== pass2){
         //le pasamos el error al campo2 que hace referencia a password2
         formGroup.get(campo2)?.setErrors({noIguales: true});
         return { noIguales: true} //objecto Error ValidationErrors
        }
        
        formGroup.get(campo2)?.setErrors(null); //OJO: si tenemos más validaciones no las pone en null asi no se cumplan.
      return null
    }
  }
}
