import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Producto {
  id?: string;
  nombre: string;
  cantidad: number;
  precio: number;
  tipo: string;
  imagen?: string;
}

export interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

 
  private apiUrl = 'http://localhost:9090/productos';

 
  private productos: Producto[] = [];
  private carrito: CarritoItem[] = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    // SOLO CARGA EL CARRITO
    if (isPlatformBrowser(this.platformId)) {
      this.cargarCarrito();
    }
  }

  // ======================================
  // ========= PRODUCTOS BACKEND ==========
  // ======================================

  
  getProductos(): Observable<Producto[]> {

    return this.http.get<any[]>(this.apiUrl)
      .pipe(

        map(productos =>

          productos.map(p => ({

            id: p.id,
            nombre: p.nombre,
            cantidad: p.stock,
            precio: p.precio,
            tipo: p.categoria,
            imagen: p.imagen || ''

          }))

        )

      );

  }

 
  obtenerProductos(): Producto[] {

    return this.productos;

  }

 
  existeProducto(id: string | undefined): boolean {

    return this.productos.some(
      p => p.id === id
    );

  }

  // POST PRODUCTO
  agregarProducto(producto: Producto): Observable<any> {

    const productoBackend = {

      nombre: producto.nombre,
      categoria: producto.tipo,
      precio: producto.precio,
      stock: producto.cantidad,
      imagen: producto.imagen || ''

    };

    return this.http.post(
      this.apiUrl,
      productoBackend
    );

  }

  // DELETE PRODUCTO
  eliminarProducto(id: string): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

  // PUT PRODUCTO
  actualizarProducto(
    id: string,
    producto: Producto
  ): Observable<any> {

    const productoBackend = {

      nombre: producto.nombre,
      categoria: producto.tipo,
      precio: producto.precio,
      stock: producto.cantidad,
      imagen: producto.imagen || ''

    };

    return this.http.put(
      `${this.apiUrl}/${id}`,
      productoBackend
    );

  }

  
 //= CARRITO ==
 

  private guardarCarrito() {

    if (isPlatformBrowser(this.platformId)) {

      localStorage.setItem(
        'carrito',
        JSON.stringify(this.carrito)
      );

    }
  }

  private cargarCarrito() {

    if (!isPlatformBrowser(this.platformId)) return;

    const datos = localStorage.getItem('carrito');

    if (datos) {

      this.carrito = JSON.parse(datos);

    }
  }

  obtenerCarrito(): CarritoItem[] {

    return this.carrito;

  }

  agregarAlCarrito(producto: Producto) {

    if (!isPlatformBrowser(this.platformId)) return;

    if (producto.cantidad <= 0) return;

    const item = this.carrito.find(
      i => i.producto.id === producto.id
    );

    if (item) {

      item.cantidad++;
      producto.cantidad--;

    } else {

      this.carrito.push({
        producto,
        cantidad: 1
      });

      producto.cantidad--;

    }

    this.guardarCarrito();

  }

  sumarCantidad(item: CarritoItem) {

    if (!isPlatformBrowser(this.platformId)) return;

    if (item.producto.cantidad > 0) {

      item.cantidad++;
      item.producto.cantidad--;

      this.guardarCarrito();

    }
  }

  restarCantidad(item: CarritoItem) {

    if (!isPlatformBrowser(this.platformId)) return;

    if (item.cantidad > 1) {

      item.cantidad--;
      item.producto.cantidad++;

      this.guardarCarrito();

    }
  }

  eliminarProductoDelCarrito(productoId: string) {

    if (!isPlatformBrowser(this.platformId)) return;

    const item = this.carrito.find(
      i => i.producto.id === productoId
    );

    if (!item) return;

    item.producto.cantidad += item.cantidad;

    this.carrito = this.carrito.filter(
      i => i.producto.id !== productoId
    );

    this.guardarCarrito();

  }

  actualizarCarrito(carritoActualizado: CarritoItem[]) {

    this.carrito = carritoActualizado;

    this.guardarCarrito();

  }

  obtenerTotal(): number {

    return this.carrito.reduce(
      (total, item) =>
        total + item.cantidad * item.producto.precio,
      0
    );

  }

  obtenerCantidadTotal(): number {

    return this.carrito.reduce(
      (total, item) => total + item.cantidad,
      0
    );

  }

  vaciarCarrito() {

    this.carrito = [];

    this.guardarCarrito();

  }

}