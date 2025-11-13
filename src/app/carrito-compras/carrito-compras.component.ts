import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioService, CarritoItem } from '../services/inventario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-carrito-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent {

  carrito: CarritoItem[] = [];
  total = 0;

  constructor(
    private inventario: InventarioService,
    private location: Location
  ) {}

  ngOnInit() {
    this.carrito = this.inventario.obtenerCarrito();
    // ✅ Evita que se muestren productos eliminados del inventario
    this.carrito = this.carrito.filter(item =>
     this.inventario.existeProducto(item.producto.id)
    );

    this.actualizarTotal();
  }

  sumar(item: CarritoItem) {
    this.inventario.sumarCantidad(item);
    this.actualizarTotal();
  }

  restar(item: CarritoItem) {
    this.inventario.restarCantidad(item);
    this.actualizarTotal();
  }

  actualizarTotal() {
    this.total = this.inventario.obtenerTotal();
  }

  regresar() {
    this.location.back();
  }
}
