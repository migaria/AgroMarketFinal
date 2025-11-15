import { Injectable } from '@angular/core';

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

  constructor() {
    this.cargarInventario();
    this.cargarCarrito();
  }

  // GUARDAR EN LOCAL STORAGE
 private guardarInventario() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('inventario', JSON.stringify(this.productos));
    }
  }

  private guardarCarrito() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }

  private cargarInventario() {
    if (typeof window !== 'undefined') {
      const datos = localStorage.getItem('inventario');
      if (datos) {
        this.productos = JSON.parse(datos);
      }
    }
  }

  private cargarCarrito() {
    if (typeof window !== 'undefined') {
      const datos = localStorage.getItem('carrito');
      if (datos) {
        this.carrito = JSON.parse(datos);
      }
    }
  }
  //AGREGAR PRODUCTO (MAPEO + VALIDACIONES)
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
      mensaje += `Se actualizó el tipo de ${existente.tipo} a ${nuevo.tipo}. `;
      existente.tipo = nuevo.tipo;
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

  //CARRITO
  obtenerCarrito(): CarritoItem[] {
    return this.carrito;
  }

  agregarAlCarrito(producto: Producto) {
    const existente = this.carrito.find(item => item.producto.id === producto.id);
  if (existente) {
    if (producto.cantidad > 0) {
      existente.cantidad++;
      producto.cantidad--; 
    }
  } else if (producto.cantidad > 0) {
    this.carrito.push({ producto, cantidad: 1 });
    producto.cantidad--; 
  }
  this.guardarInventario();
  this.guardarCarrito();
  }

  sumarCantidad(item: CarritoItem) {
    const producto = this.productos.find(p => p.id === item.producto.id);
  if (producto && producto.cantidad > 0) {
    item.cantidad++;
    producto.cantidad--;
    this.guardarInventario();
    this.guardarCarrito();
    }
  }

  restarCantidad(item: CarritoItem) {
    const producto = this.productos.find(p => p.id === item.producto.id);
  if (item.cantidad > 1) {
    item.cantidad--;
    if (producto) producto.cantidad++; 
  } else {
    this.carrito = this.carrito.filter(i => i !== item);
    if (producto) producto.cantidad++; 
  }
  this.guardarInventario();
  this.guardarCarrito();  
 }
 //método para vaciar carrito tras la compra
comprar(): string {
  if (this.carrito.length === 0) return '🛒 El carrito está vacío.';
  const total = this.obtenerTotal();
  this.carrito = [];
  this.guardarCarrito();
  return `✅ Compra realizada con éxito. Total: $${total.toFixed(2)}`;
 }

  obtenerTotal(): number {
    return this.carrito.reduce(
      (total, item) => total + item.cantidad * item.producto.precio,
      0
    );
  }
}
