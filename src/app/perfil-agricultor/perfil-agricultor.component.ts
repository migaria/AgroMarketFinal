import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

import {
  InventarioService,
  Producto
} from '../services/inventario.service';

@Component({
  selector: 'app-perfil-agricultor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-agricultor.component.html',
  styleUrls: ['./perfil-agricultor.component.css']
})

export class PerfilAgricultorComponent {

  nombre = '';

  stock: number | null = null;

  precio: number | null = null;

  categoria = '';

  mensajeExito = '';

  imagen = '';

  imagenPreview: string | ArrayBuffer | null = null;

  productos: Producto[] = [];

  mostrar = false;

  editando = false;

  productoEditandoId = '';

  constructor(
    private location: Location,
    private inventario: InventarioService
  ) {}

  ngOnInit() {

    this.cargarProductos();

  }

  cargarProductos() {

    this.inventario
      .getProductos()
      .subscribe({

        next: (data) => {

          this.productos = data;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  soloLetras(event: any) {

    event.target.value =
      event.target.value.replace(
        /[^a-zA-ZÀ-ÿ\s]/g,
        ''
      );

    this.nombre = event.target.value;

  }

  soloNumeros(event: any) {

    event.target.value =
      event.target.value.replace(
        /[^0-9]/g,
        ''
      );

    this.stock =
      event.target.value
        ? Number(event.target.value)
        : null;

  }

  soloDecimales(event: any) {

    event.target.value =
      event.target.value.replace(
        /[^0-9.]/g,
        ''
      );

    this.precio =
      event.target.value
        ? Number(event.target.value)
        : null;

  }

  onFileSelected(event: any) {

    const file =
      event.target.files[0];

    if (file) {

      const reader =
        new FileReader();

      reader.onload = () => {

        this.imagen =
          reader.result as string;

        this.imagenPreview =
          reader.result;

      };

      reader.readAsDataURL(file);

    }

  }

  guardar() {

  if (
    !this.nombre ||
    !this.stock ||
    !this.precio ||
    !this.categoria
  ) {

    alert('Completa todos los campos');

    return;

  }

  const producto: Producto = {

    nombre: this.nombre,

    stock: this.stock,

    precio: this.precio,

    categoria: this.categoria,

    imagen: this.imagen

  };

  if (this.editando) {

    producto.id = this.productoEditandoId;

    this.inventario
      .actualizarProducto(
        this.productoEditandoId,
        producto
      )
      .subscribe({

        next: () => {

          this.mensajeExito =
            'Producto actualizado correctamente';

          this.cargarProductos();

          this.cancelar();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  else {

    this.inventario
      .agregarProducto(producto)
      .subscribe({

        next: () => {

          this.mensajeExito =
            'Producto agregado correctamente';

          this.cargarProductos();

          this.cancelar();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}

  editarProducto(producto: Producto) {

    this.editando = true;

    this.mostrar = false;

    this.productoEditandoId =
      producto.id || '';

    this.nombre =
      producto.nombre;

    this.stock =
      producto.stock;

    this.precio =
      producto.precio;

    this.categoria =
      producto.categoria;

    this.imagen =
      producto.imagen || '';

    this.imagenPreview =
      producto.imagen || '';

  }

  eliminarProducto(id: string) {

    const confirmar =
      confirm('¿Eliminar producto?');

    if (!confirmar) return;

    this.inventario
      .eliminarProducto(id)
      .subscribe({

        next: () => {

          this.mensajeExito =
            'Producto eliminado';

          this.cargarProductos();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  cancelar() {

    this.nombre = '';

    this.stock = null;

    this.precio = null;

    this.categoria = '';

    this.imagen = '';

    this.imagenPreview = null;

    this.editando = false;

    this.productoEditandoId = '';

  }

  abrirProductos() {

    this.mostrar =
      !this.mostrar;

  }

  regresar() {

    this.location.back();

  }

}