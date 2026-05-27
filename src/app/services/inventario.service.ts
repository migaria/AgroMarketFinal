import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

export interface Producto {

  id?: string;

  nombre: string;

  categoria: string;

  precio: number;

  stock: number;

  imagen: string;

}

export interface CarritoItem {

  producto: Producto;

  cantidad: number;

}

@Injectable({
  providedIn: 'root'
})

export class InventarioService {

  private apiUrl =
    'http://localhost:9090/productos';

  private carrito: CarritoItem[] = [];

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // PRODUCTOS API
  // =========================

  getProductos():
    Observable<Producto[]> {

    return this.http.get<Producto[]>(
      this.apiUrl
    );

  }

  agregarProducto(
    producto: Producto
  ): Observable<Producto> {

    return this.http.post<Producto>(
      this.apiUrl,
      producto
    );

  }

  actualizarProducto(
    id: string,
    producto: Producto
  ): Observable<Producto> {

    return this.http.put<Producto>(
      `${this.apiUrl}/${id}`,
      producto
    );

  }

  eliminarProducto(
    id: string
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

  existeProducto(id: string): boolean {

    return this.carrito.some(
      item => item.producto.id === id
    );

  }

  // =========================
  // CARRITO
  // =========================

  obtenerCarrito():
    CarritoItem[] {

    return this.carrito;

  }

  agregarAlCarrito(
    producto: Producto
  ) {

    const item =
      this.carrito.find(
        i => i.producto.id === producto.id
      );

    if (item) {

      item.cantidad++;

    }

    else {

      this.carrito.push({

        producto,

        cantidad: 1

      });

    }

  }

  sumarCantidad(
    item: CarritoItem
  ) {

    item.cantidad++;

  }

  restarCantidad(
    item: CarritoItem
  ) {

    if (item.cantidad > 1) {

      item.cantidad--;

    }

  }

  eliminarProductoDelCarrito(
    productoId: string
  ) {

    this.carrito =
      this.carrito.filter(
        item =>
          item.producto.id !== productoId
      );

  }

  obtenerTotal(): number {

    return this.carrito.reduce(

      (total, item) =>

        total +
        item.cantidad *
        item.producto.precio,

      0

    );

  }

}