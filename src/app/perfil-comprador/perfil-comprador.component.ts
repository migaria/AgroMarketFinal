import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { InventarioService, Producto, CarritoItem } from '../services/inventario.service';

@Component({
  selector: 'app-perfil-comprador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-comprador.component.html',
  styleUrls: ['./perfil-comprador.component.css']
})
export class PerfilCompradorComponent {

  productos: Producto[] = [];
  carrito: CarritoItem[] = [];

  panelAbierto: boolean = false;
  totalItems: number = 0;

  constructor(
    private inventario: InventarioService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.productos = this.inventario.obtenerProductos();
    this.carrito = this.inventario.obtenerCarrito();
    this.actualizarContador();
  }

  // Abrir / Cerrar panel carrito
  togglePanel() {
    this.panelAbierto = !this.panelAbierto;
  }

  // Contar items
  obtenerTotalItems(): number {
    return this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
  }

  actualizarContador() {
    this.totalItems = this.obtenerTotalItems();
  }

  // Carrito
  agregarAlCarrito(producto: Producto) {
    this.inventario.agregarAlCarrito(producto);
    this.carrito = this.inventario.obtenerCarrito();
    this.actualizarContador();
  }

  sumar(item: CarritoItem) {
    this.inventario.sumarCantidad(item);
    this.carrito = this.inventario.obtenerCarrito();
    this.actualizarContador();
  }

  restar(item: CarritoItem) {
    this.inventario.restarCantidad(item);
    this.carrito = this.inventario.obtenerCarrito();
    this.actualizarContador();
  }

  // CALCULAR TOTAL DEL CARRITO (AQUÍ ESTÁ LO QUE TE FALTABA)
  obtenerTotal(): number {
    return this.carrito.reduce(
      (total, item) => total + item.cantidad * item.producto.precio,
      0
    );
  }

  regresar() {
    this.location.back();
  }
}
