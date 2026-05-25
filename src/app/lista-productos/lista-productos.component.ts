import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  InventarioService,
  Producto
} from '../services/inventario.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent
implements OnInit {

  productos: Producto[] = [];

  constructor(
    private inventarioService: InventarioService
  ) {}

  ngOnInit(): void {

    this.inventarioService.getProductos()
      .subscribe(data => {

        console.log(data);

        this.productos = data;

      });

  }

}