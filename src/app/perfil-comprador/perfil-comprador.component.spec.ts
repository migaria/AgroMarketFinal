import { Injectable } from '@angular/core';

export interface CarritoItem {
  producto: any;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private productos = [
    { id: 1, nombre: 'Tomate', precio: 2000, imagen: 'assets/tomate.jpg' },
    { id: 2, nombre: 'Papa', precio: 1500, imagen: 'assets/papa.jpg' },
    { id: 3, nombre: 'Cebolla', precio: 3000, imagen: 'assets/cebolla.jpg' }
  ];

  private carrito: CarritoItem[] = [];

  constructor() {}

  // Obtener productos
  obtenerProductos() {
    return this.productos;
  }

  // Obtener el carrito
  obtenerCarrito() {
    return this.carrito;
  }

  // AGREGAR producto al carrito
  agregarAlCarrito(producto: any) {
    const existe = this.carrito.find(i => i.producto.id === producto.id);

    if (existe) {
      existe.cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
    }
  }

  // SUMAR cantidad
  sumar(id: number) {
    const item = this.carrito.find(i => i.producto.id === id);
    if (item) item.cantidad++;
  }

  // RESTAR cantidad
  restar(id: number) {
    const item = this.carrito.find(i => i.producto.id === id);
    if (item) {
      item.cantidad--;
      if (item.cantidad <= 0) {
        this.eliminar(id);
      }
    }
  }

  // ELIMINAR del carrito
  eliminar(id: number) {
    this.carrito = this.carrito.filter(i => i.producto.id !== id);
  }

  // TOTAL general
  obtenerTotal() {
    return this.carrito.reduce((t, i) => t + i.producto.precio * i.cantidad, 0);
  }

  // CANTIDAD total para el contador
  obtenerCantidadTotal() {
    return this.carrito.reduce((t, i) => t + i.cantidad, 0);
  }
}

