import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { InventarioService, Producto } from '../services/inventario.service';

@Component({
  selector: 'app-perfil-comprador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-comprador.component.html',
  styleUrls: ['./perfil-comprador.component.css']
})
export class PerfilCompradorComponent {

  productos: Producto[] = [];

  constructor(
    private inventario: InventarioService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    // Aquí recibes los productos creados por el agricultor
    this.productos = this.inventario.obtenerProductos();
  }

  agregarAlCarrito(producto: Producto) {
    this.inventario.agregarAlCarrito(producto);
    this.router.navigate(['/carrito']);
  }

  regresar(): void {
    this.location.back();
  }
}
