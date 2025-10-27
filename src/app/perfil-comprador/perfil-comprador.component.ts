import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-comprador',
  standalone: true,
  templateUrl: './perfil-comprador.component.html',
  styleUrls: ['./perfil-comprador.component.css']
})
export class PerfilCompradorComponent {
  constructor(private router: Router) {}

  agregarAlCarrito() {
    // Aquí podrías guardar el producto en una lista o mostrar un mensaje
    console.log('Producto agregado al carrito');

    // Luego redirigir al carrito
    this.router.navigate(['/carrito']);
  }

}
