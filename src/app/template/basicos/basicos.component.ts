import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;
  valorInitForm = {
    producto: 'valor inicial',
    precio: 1,
    existencias: 1

  }

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean{
    return this.miFormulario?.controls['producto']?.invalid 
            && this.miFormulario?.controls['producto']?.touched;
  }

  precioInValido(): boolean{
    return this.miFormulario?.controls['precio']?.value < 0 
            || (this.miFormulario?.controls['precio']?.touched 
                && this.miFormulario?.controls['precio']?.value ===  "" );
  }

  // guardar(miFormulario: NgForm){
  guardar(){
    console.log(this.miFormulario);
    this.miFormulario.resetForm(
      {
        producto: 'algo',
        precio: 0,
        existencias: 0
      }
    );
  }

}
