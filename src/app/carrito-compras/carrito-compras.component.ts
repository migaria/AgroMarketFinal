import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { InventarioService, CarritoItem } from '../services/inventario.service';

@Component({
  selector: 'app-carrito-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  carrito: CarritoItem[] = [];
  total = 0;

  constructor(
    private inventario: InventarioService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.carrito = this.inventario.obtenerCarrito();
    this.actualizarTotal();
  }

  sumar(item: CarritoItem): void {
    this.inventario.sumarCantidad(item);
    this.carrito = this.inventario.obtenerCarrito();
    this.actualizarTotal();
  }

  restar(item: CarritoItem): void {
    this.inventario.restarCantidad(item);
    this.carrito = this.inventario.obtenerCarrito();
    this.actualizarTotal();
  }

  eliminar(item: CarritoItem): void {
    this.inventario.eliminarProductoDelCarrito(item.producto.id || '');
    this.carrito = this.inventario.obtenerCarrito();
    this.actualizarTotal();
  }

  actualizarTotal(): void {
    this.total = this.inventario.obtenerTotal();
  }

  regresar(): void {
    this.location.back();
  }
}