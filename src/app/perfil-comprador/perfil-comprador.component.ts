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

  panelAbierto = false;

  totalItems = 0;

  constructor(
    private inventario: InventarioService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {

    // =========================
    // CARGAR PRODUCTOS BACKEND
    // =========================

    this.inventario
      .getProductos()
      .subscribe({

        next: (data: Producto[]) => {

          this.productos = data;

        },

        error: (error: any) => {

          console.error(
            'Error cargando productos:',
            error
          );

        }

      });

    // =========================
    // CARRITO
    // =========================

    this.carrito =
      this.inventario.obtenerCarrito();

    this.actualizarContador();

  }

  // =========================
  // PANEL CARRITO
  // =========================

  togglePanel() {

    this.panelAbierto =
      !this.panelAbierto;

  }

  // =========================
  // CONTADOR
  // =========================

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

  // =========================
  // AGREGAR CARRITO
  // =========================

  agregarAlCarrito(
    producto: Producto
  ) {

    this.inventario
      .agregarAlCarrito(producto);

    this.carrito =
      this.inventario.obtenerCarrito();

    this.actualizarContador();

  }

  // =========================
  // SUMAR
  // =========================

  sumar(item: CarritoItem) {

    this.inventario
      .sumarCantidad(item);

    this.carrito =
      this.inventario.obtenerCarrito();

    this.actualizarContador();

  }

  // =========================
  // RESTAR
  // =========================

  restar(item: CarritoItem) {

    this.inventario
      .restarCantidad(item);

    this.carrito =
      this.inventario.obtenerCarrito();

    this.actualizarContador();

  }

  // =========================
  // ELIMINAR
  // =========================

  eliminar(item: CarritoItem) {

    this.inventario
      .eliminarProductoDelCarrito(
        item.producto.id || ''
      );

    this.carrito =
      this.inventario.obtenerCarrito();

    this.actualizarContador();

  }

  // =========================
  // TOTAL
  // =========================

  obtenerTotal(): number {

    return this.carrito.reduce(

      (total, item) =>

        total +
        item.cantidad *
        item.producto.precio,

      0

    );

  }

  // =========================
  // REGRESAR
  // =========================

  regresar() {

    this.location.back();

  }

}