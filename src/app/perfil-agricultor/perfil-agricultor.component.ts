import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Location } from '@angular/common';
import { InventarioService, Producto } from '../services/inventario.service';

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


  productos: Producto[] = [];

  constructor(
    private location: Location,
    private inventario: InventarioService
  ) {}

  ngOnInit() {
    // ✅ cargar productos ya existentes
    this.productos = this.inventario.obtenerProductos();
  }

  soloLetras(event: any) {
    event.target.value = event.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    this.nombre = event.target.value;
  }

  soloNumeros(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value.startsWith('0')) {
      input.value = input.value.replace(/^0+/, ''); 
    }
    this.cantidad = input.value ? Number(input.value) : null;
}

  soloDecimales(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9.]/g, '');
    if (input.value.startsWith('0')) {
      input.value = input.value.replace(/^0+/, ''); 
  }
    this.precio = input.value ? Number(input.value) : null;
  }

  guardar() {
    if (!this.nombre || !this.cantidad || !this.precio || !this.tipo) {
      alert('completa todos los campos.');
      return;
    }

    // JSON mapeado
    const productoJSON = {
      id: Date.now(),
      nombre: this.nombre,
      cantidad: this.cantidad,
      precio: this.precio,
      tipo: this.tipo,
      imagen: this.imagen  
    };

    const respuesta = this.inventario.agregarProducto(productoJSON);
    this.mensajeExito = respuesta;

    // ✅ actualizar vista
    this.productos = this.inventario.obtenerProductos();

    if (respuesta.startsWith('✅')) {
      this.cancelar();
    }

    setTimeout(() => this.mensajeExito = '', 3000);
  }

  cancelar() {
    this.nombre = '';
    this.cantidad = null;
    this.precio = null;
    this.tipo = '';
    this.imagen = '';
  }
  eliminar() {
  if (!this.nombre) {
    this.mensajeExito = '❌ Escribe el nombre del producto que deseas eliminar.';
    return;
  }

  const mensaje = this.inventario.eliminarPorNombre(this.nombre);
  this.mensajeExito = mensaje;

  // limpiar campos si se eliminó
  if (mensaje.startsWith('✅')) {
    this.cancelar();
  }

    setTimeout(() => this.mensajeExito = '', 3000);
  }


  regresar() {
    this.location.back();
  }
}