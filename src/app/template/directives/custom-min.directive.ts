import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validators } from "@angular/forms";

@Directive({
    selector:'[customMin][ngModel]', //le especificamos que donde se use debe tener un ngModel para que entre la directiva
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true
    }],
})
export class CustomMinDirective implements Validators{

    @Input() minimo!: number; //viene del [minimo]=0 del html

    constructor() {}

    validate( control: FormControl ){
        const inputValue = control.value;

        return (inputValue < this.minimo)
                ? {'customMin': true}
                : null;
    }


}