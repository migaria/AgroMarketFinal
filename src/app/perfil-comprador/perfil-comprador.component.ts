import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {
  InventarioService,
  Producto,
  CarritoItem
} from '../services/inventario.service';

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

    // 🔥 CARGAR PRODUCTOS DESDE EL BACKEND
    this.cargarProductos();

    // 🔥 CARGAR CARRITO
    this.carrito =
      this.inventario.obtenerCarrito();

    this.actualizarContador();

  }

  // =========================================
  // ========= GET PRODUCTOS BACKEND =========
  // =========================================

  cargarProductos() {

    this.inventario.getProductos()
      .subscribe({

        next: (data) => {

          this.productos = data;

        },

        error: (error) => {

          console.error(
            'Error cargando productos:',
            error
          );

        }

      });

  }

  // =========================================
  // ============= PANEL CARRITO =============
  // =========================================

  togglePanel() {

    this.panelAbierto =
      !this.panelAbierto;

  }

  obtenerTotalItems(): number {

    return this.carrito.reduce(

      (acc, item) =>
        acc + item.cantidad,

      0

    );

  }

  actualizarContador() {

    this.totalItems =
      this.obtenerTotalItems();

  }

  // =========================================
  // ========= AGREGAR AL CARRITO ============
  // =========================================

  agregarAlCarrito(producto: Producto) {

    this.inventario
      .agregarAlCarrito(producto);

    this.carrito =
      this.inventario.obtenerCarrito();

    this.actualizarContador();

  }

  // =========================================
  // ========= SUMAR PRODUCTO =================
  // =========================================

  sumar(item: CarritoItem) {

    this.inventario
      .sumarCantidad(item);

    this.carrito =
      this.inventario.obtenerCarrito();

    this.actualizarContador();

  }

  // =========================================
  // ========= RESTAR PRODUCTO ===============
  // =========================================

  restar(item: CarritoItem) {

    this.inventario
      .restarCantidad(item);

    this.carrito =
      this.inventario.obtenerCarrito();

    this.actualizarContador();

  }

  // =========================================
  // ========= ELIMINAR PRODUCTO =============
  // =========================================

  eliminar(item: CarritoItem) {

    this.inventario
      .eliminarProductoDelCarrito(
        item.producto.id!
      );

    this.carrito =
      this.inventario.obtenerCarrito();

    this.actualizarContador();

  }

  // =========================================
  // =============== TOTAL ===================
  // =========================================

  obtenerTotal(): number {

    return this.carrito.reduce(

      (total, item) =>

        total +
        item.cantidad *
        item.producto.precio,

      0

    );

  }

  // =========================================
  // ============== REGRESAR =================
  // =========================================

  regresar() {

    this.location.back();

  }

}