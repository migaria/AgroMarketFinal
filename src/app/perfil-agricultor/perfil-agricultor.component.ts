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

  cantidad: number | null = null;

  precio: number | null = null;

  tipo = '';

  mensajeExito = '';

  imagen = '';

  imagenPreview: string | ArrayBuffer | null = null;

  imagenArchivo: File | null = null;

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

  soloNumeros(event: Event) {

    const input = event.target as HTMLInputElement;

    input.value =
      input.value.replace(/[^0-9]/g, '');

    if (input.value.startsWith('0')) {

      input.value =
        input.value.replace(/^0+/, '');

    }

    this.cantidad =
      input.value
        ? Number(input.value)
        : null;

  }

  soloDecimales(event: Event) {

    const input =
      event.target as HTMLInputElement;

    input.value =
      input.value.replace(/[^0-9.]/g, '');

    this.precio =
      input.value
        ? Number(input.value)
        : null;

  }

  onFileSelected(event: any): void {

    const file = event.target.files[0];

    if (file) {

      this.imagenArchivo = file;

      const reader = new FileReader();

      reader.onload = () => {

        this.imagenPreview = reader.result;

        this.imagen =
          reader.result as string;

      };

      reader.readAsDataURL(file);

    }

  }

  guardar() {

    if (
      !this.nombre ||
      !this.cantidad ||
      !this.precio ||
      !this.tipo
    ) {

      alert('Completa todos los campos');

      return;

    }

    const productoJSON: Producto = {

      nombre: this.nombre,

      cantidad: this.cantidad,

      precio: this.precio,

      tipo: this.tipo,

      imagen: this.imagen

    };

    // ACTUALIZAR
    if (this.editando) {

      this.inventario
        .actualizarProducto(
          this.productoEditandoId,
          productoJSON
        )
        .subscribe({

          next: () => {

            this.mensajeExito =
              'Producto actualizado correctamente';

            this.cargarProductos();

            this.cancelar();

            setTimeout(() => {

              this.mensajeExito = '';

            }, 3000);

          },

          error: (error) => {

            console.error(error);

            this.mensajeExito =
              'Error al actualizar';

          }

        });

    }

    // GUARDAR NUEVO
    else {

      this.inventario
        .agregarProducto(productoJSON)
        .subscribe({

          next: () => {

            this.mensajeExito =
              'Producto agregado correctamente';

            this.cargarProductos();

            this.cancelar();

            setTimeout(() => {

              this.mensajeExito = '';

            }, 3000);

          },

          error: (error) => {

            console.error(error);

            this.mensajeExito =
              'Error al guardar';

          }

        });

    }

  }

  editarProducto(producto: Producto) {

    this.editando = true;

    this.productoEditandoId =
      producto.id!;

    this.nombre =
      producto.nombre;

    this.cantidad =
      producto.cantidad;

    this.precio =
      producto.precio;

    this.tipo =
      producto.tipo;

    this.imagen =
      producto.imagen || '';

    this.imagenPreview =
      producto.imagen || '';

  }

  eliminarProducto(id: string) {

    const confirmar =
      confirm(
        '¿Seguro que deseas eliminar este producto?'
      );

    if (!confirmar) return;

    this.inventario
      .eliminarProducto(id)
      .subscribe({

        next: () => {

          this.mensajeExito =
            'Producto eliminado correctamente';

          this.cargarProductos();

          this.cancelar();

          setTimeout(() => {

            this.mensajeExito = '';

          }, 3000);

        },

        error: (error) => {

          console.error(error);

          this.mensajeExito =
            'Error al eliminar';

        }

      });

  }

  cancelar() {

    this.nombre = '';

    this.cantidad = null;

    this.precio = null;

    this.tipo = '';

    this.imagen = '';

    this.imagenArchivo = null;

    this.imagenPreview = null;

    this.editando = false;

    this.productoEditandoId = '';

  }

  regresar() {

    this.location.back();

  }

}