import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

//realizamos una validacion asincrona que depende de un servicio adicional (http)
export class EmailValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl):  Observable<ValidationErrors | null> {

    const email: string = control.value;
    console.log(email);
    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${ email }`)
                  .pipe(
                    delay(3000), //le decimos que espere 3 segundos, podemos verlo en el pending del formulario al validar
                    //con map: transformamos el valor del observable a null o un {}
                    map(resp =>{
                     return ( resp.length === 0 )
                            ? null
                            : {emailTomado: true}
                    })
                  )    
  }
}
