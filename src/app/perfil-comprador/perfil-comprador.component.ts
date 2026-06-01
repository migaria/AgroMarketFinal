import { Component, OnInit } from '@angular/core';
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
export class PerfilCompradorComponent implements OnInit {

  productos: Producto[] = [];
  carrito: CarritoItem[] = [];
  panelAbierto = false;
  totalItems = 0;

  constructor(
    private inventario: InventarioService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.inventario.getProductos().subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
      },
      error: (err: any) => {
        console.error('Error cargando productos:', err);
      }
    });

    this.carrito = this.inventario.obtenerCarrito();
    this.actualizarContador();
  }

  togglePanel(): void {
    this.panelAbierto = !this.panelAbierto;
  }

  obtenerTotalItems(): number {
    return this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
  }

  actualizarContador(): void {
    this.totalItems = this.obtenerTotalItems();
  }

  agregarAlCarrito(producto: Producto): void {
    if (producto.stock <= 0) {
      alert('No hay stock disponible');
      return;
    }
    this.inventario.agregarAlCarrito(producto);
    this.carrito = this.inventario.obtenerCarrito();
    this.actualizarContador();
  }

  sumar(item: CarritoItem): void {
    this.inventario.sumarCantidad(item);
    this.carrito = this.inventario.obtenerCarrito();
    this.actualizarContador();
  }

  restar(item: CarritoItem): void {
    this.inventario.restarCantidad(item);
    this.carrito = this.inventario.obtenerCarrito();
    this.actualizarContador();
  }

  eliminar(item: CarritoItem): void {
    this.inventario.eliminarProductoDelCarrito(item.producto.id || '');
    this.carrito = this.inventario.obtenerCarrito();
    this.actualizarContador();
  }

  obtenerTotal(): number {
    return this.carrito.reduce((total, item) =>
      total + item.cantidad * item.producto.precio, 0);
  }

  regresar(): void {
    this.location.back();
  }
}