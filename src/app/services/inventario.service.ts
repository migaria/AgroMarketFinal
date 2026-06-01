import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Producto {
  id?: string;
  nombre: string;
  stock: number;
  precio: number;
  categoria: string;
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

  private apiUrl = 'http://localhost:9090/agricultor';
  private carrito: CarritoItem[] = [];

  constructor(private http: HttpClient) {}

  // ================================
  // PRODUCTOS
  // ================================

  getProductos(): Observable<Producto[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(p => ({
        id: p.id,
        nombre: p.nombre,
        stock: p.cantidad,
        precio: p.precio,
        categoria: p.tipo,
        imagen: p.imagen
      })))
    );
  }

  agregarProducto(producto: Producto): Observable<any> {
    const body = {
      nombre: producto.nombre,
      cantidad: producto.stock,
      precio: producto.precio,
      tipo: producto.categoria,
      imagen: producto.imagen
    };
    return this.http.post(this.apiUrl, body);
  }

  actualizarProducto(id: string, producto: Producto): Observable<any> {
    const body = {
      nombre: producto.nombre,
      cantidad: producto.stock,
      precio: producto.precio,
      tipo: producto.categoria,
      imagen: producto.imagen
    };
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  actualizarStock(producto: Producto): Observable<any> {
    const body = {
      nombre: producto.nombre,
      cantidad: producto.stock,
      precio: producto.precio,
      tipo: producto.categoria,
      imagen: producto.imagen
    };
    return this.http.put(`${this.apiUrl}/${producto.id}`, body);
  }

  // ================================
  // CARRITO
  // ================================

  obtenerCarrito(): CarritoItem[] {
    return this.carrito;
  }

  existeProducto(id: string): boolean {
    return this.carrito.some(i => i.producto.id === id);
  }

  agregarAlCarrito(producto: Producto): void {
    if (producto.stock <= 0) return;

    const existe = this.carrito.find(i => i.producto.id === producto.id);
    if (existe) {
      existe.cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
    }

    // Disminuye stock localmente
    producto.stock--;

    // Actualiza stock en el backend
    this.actualizarStock(producto).subscribe({
      error: (err) => console.error('Error actualizando stock:', err)
    });
  }

  sumarCantidad(item: CarritoItem): void {
    const found = this.carrito.find(i => i.producto.id === item.producto.id);
    if (found) {
      if (found.producto.stock <= 0) return;
      found.cantidad++;
      found.producto.stock--;
      this.actualizarStock(found.producto).subscribe({
        error: (err) => console.error('Error actualizando stock:', err)
      });
    }
  }

  restarCantidad(item: CarritoItem): void {
    const found = this.carrito.find(i => i.producto.id === item.producto.id);
    if (found) {
      found.cantidad--;
      found.producto.stock++;
      this.actualizarStock(found.producto).subscribe({
        error: (err) => console.error('Error actualizando stock:', err)
      });
      if (found.cantidad <= 0) {
        this.eliminarProductoDelCarrito(item.producto.id || '');
      }
    }
  }

  eliminarProductoDelCarrito(id: string): void {
    const item = this.carrito.find(i => i.producto.id === id);
    if (item) {
      // Devuelve todo el stock al backend
      item.producto.stock += item.cantidad;
      this.actualizarStock(item.producto).subscribe({
        error: (err) => console.error('Error actualizando stock:', err)
      });
    }
    this.carrito = this.carrito.filter(i => i.producto.id !== id);
  }

  obtenerTotal(): number {
    return this.carrito.reduce((t, i) => t + i.producto.precio * i.cantidad, 0);
  }

  obtenerCantidadTotal(): number {
    return this.carrito.reduce((t, i) => t + i.cantidad, 0);
  }
}