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

  panelAbierto: boolean = false;   // ⬅ Necesario
  totalItems: number = 0;          // ⬅ Para el ícono del carrito

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

  // ==========================
  //      PANEL LATERAL
  // ==========================
  togglePanel() {
    this.panelAbierto = !this.panelAbierto;
  }

  obtenerTotalItems(): number {
    return this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
  }

  actualizarContador() {
    this.totalItems = this.obtenerTotalItems();
  }

  // ==========================
  //      CARRITO
  // ==========================
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

  irACarrito() {
    this.router.navigate(['/carrito']);
  }

  regresar(): void {
    this.location.back();
  }
}
