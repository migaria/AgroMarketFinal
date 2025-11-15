import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  tipo: string;
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

  private productos: Producto[] = [];
  private carrito: CarritoItem[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Solo ejecutar en navegador (no en SSR)
    if (isPlatformBrowser(this.platformId)) {
      this.cargarInventario();
      this.cargarCarrito();
    }
  }

  // ======================================================
  // GUARDAR EN LOCAL STORAGE
  // ======================================================

  private guardarInventario() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('inventario', JSON.stringify(this.productos));
    }
  }

  private guardarCarrito() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }

  private cargarInventario() {
    if (!isPlatformBrowser(this.platformId)) return;

    const datos = localStorage.getItem('inventario');
    if (datos) {
      this.productos = JSON.parse(datos);
    }
  }

  private cargarCarrito() {
    if (!isPlatformBrowser(this.platformId)) return;

    const datos = localStorage.getItem('carrito');
    if (datos) {
      this.carrito = JSON.parse(datos);
    }
  }

  // ======================================================
  //        AGREGAR PRODUCTO (MAPEO + VALIDACIONES)
  // ======================================================
  agregarProducto(producto: any): string {

    const nuevo: Producto = {
      id: producto.id,
      nombre: producto.nombre.trim(),
      cantidad: Number(producto.cantidad),
      precio: Number(producto.precio),
      tipo: producto.tipo,
      imagen: producto.imagen || ''
    };

    const existente = this.productos.find(
      p => p.nombre.toLowerCase() === nuevo.nombre.toLowerCase()
    );

    if (existente) {
      let mensaje = `✅ Producto existente encontrado. `;

      if (existente.tipo !== nuevo.tipo) {
        return `⚠️ El producto "${nuevo.nombre}" ya existe pero con otro tipo (${existente.tipo}).`;
      }

      if (existente.precio !== nuevo.precio) {
        mensaje += `Se actualizó el precio de ${existente.precio} a ${nuevo.precio}. `;
        existente.precio = nuevo.precio;
      }

      if (nuevo.imagen && existente.imagen !== nuevo.imagen) {
        existente.imagen = nuevo.imagen;
        mensaje += ` Imagen actualizada.`;
      }

      existente.cantidad += nuevo.cantidad;
      mensaje += `Cantidad total: ${existente.cantidad} Kg.`;

      this.guardarInventario();
      return `✅ Se actualizó la cantidad: ahora tienes ${existente.cantidad} Kg.`;
    }

    this.productos.push(nuevo);
    this.guardarInventario();

    return `✅ Producto "${nuevo.nombre}" agregado correctamente.`;
  }

  obtenerProductos(): Producto[] {
    return this.productos;
  }

  existeProducto(id: number): boolean {
    return this.productos.some(p => p.id === id);
  }

  eliminarPorNombre(nombre: string): string {
    const index = this.productos.findIndex(
      p => p.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (index === -1) {
      return `❌ No se encontró el producto "${nombre}".`;
    }

    const eliminado = this.productos[index].nombre;
    const idDelProducto = this.productos[index].id;

    this.productos.splice(index, 1);
    this.guardarInventario();

    // Eliminar también del carrito
    this.carrito = this.carrito.filter(item => item.producto.id !== idDelProducto);
    this.guardarCarrito();

    return `✅ Producto "${eliminado}" eliminado correctamente.`;
  }

  // ======================================================
  //                       CARRITO
  // ======================================================

  obtenerCarrito(): CarritoItem[] {
    return this.carrito;
  }

  agregarAlCarrito(producto: Producto) {
    if (!isPlatformBrowser(this.platformId)) return;

    if (producto.cantidad <= 0) return;

    const item = this.carrito.find(i => i.producto.id === producto.id);

    if (item) {
      item.cantidad++;
      producto.cantidad--;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
      producto.cantidad--;
    }

    this.guardarInventario();
    this.guardarCarrito();
  }

  sumarCantidad(item: CarritoItem) {
    if (!isPlatformBrowser(this.platformId)) return;

    if (item.producto.cantidad > 0) {
      item.cantidad++;
      item.producto.cantidad--;
      this.guardarInventario();
      this.guardarCarrito();
    }
  }

  restarCantidad(item: CarritoItem) {
    if (!isPlatformBrowser(this.platformId)) return;

    if (item.cantidad > 1) {
      item.cantidad--;
      item.producto.cantidad++;
      this.guardarInventario();
      this.guardarCarrito();
    }
  }

  obtenerTotal(): number {
    return this.carrito.reduce(
      (total, item) => total + item.cantidad * item.producto.precio,
      0
    );
  }
}
