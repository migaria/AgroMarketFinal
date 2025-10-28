import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-perfil-comprador',
  standalone: true,
  templateUrl: './perfil-comprador.component.html',
  styleUrls: ['./perfil-comprador.component.css']
})
export class PerfilCompradorComponent {
  constructor(private router: Router, private location: Location) {}

  agregarAlCarrito() {
    // Aquí podrías guardar el producto en una lista o mostrar un mensaje
    console.log('Producto agregado al carrito');

    // Luego redirigir al carrito
    this.router.navigate(['/carrito']);
  }
  

  regresar(): void {
    this.location.back();
  }

}
