import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent  {
  
  miFormulario : FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.formBuilder.array([
      [ 'Messi', Validators.required ], //no son arrays son colecciones de form controls
      [ 'Iniesta', Validators.required ],
    ], Validators.required)
  });

  nuevoFavorito: FormControl = this.formBuilder.control('', Validators.required);

  get favoritosArray(){
    //le decimos que todo eso es un formArray
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  campoNoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }

  agregarFavorito(){
    if( this.nuevoFavorito.invalid ){ return; }

    //ya que los FormArray son controls, le podemos añadir  el nuevo favorito a través del get favoritosArray.push 
    // this.favoritosArray.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );  //opcion 1
    this.favoritosArray.push( this.formBuilder.control( this.nuevoFavorito.value, Validators.required ) );     //opcion 2
    
    this.nuevoFavorito.reset();
  }

  borrarFavorito(indice: number){
    this.favoritosArray.removeAt(indice);
  }


  guardar(){

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}
