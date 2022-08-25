import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre:    string;
  favoritos: Favorito [];
}
interface Favorito {
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent  {

persona: Persona = {
  nombre: 'Arley Rivas',
  favoritos: [
    {id: 1,  nombre: 'Messi' },
    {id: 2,  nombre: 'Iniesta' },

  ]
}

  guardar(){
    console.log('this.miFormulario.controls');
  }
  eliminar( index: number ){
    this.persona.favoritos.splice(index, 1);
  }

}
