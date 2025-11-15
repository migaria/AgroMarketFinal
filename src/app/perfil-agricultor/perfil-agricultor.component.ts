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

  imagenPreview: string | ArrayBuffer | null = null;
  imagenArchivo: File | null = null;

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
   // ✅ Manejar la carga de imagen desde el PC
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imagenArchivo = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result;
        this.imagen = reader.result as string; // se guarda como base64
      };
      reader.readAsDataURL(file);
    }
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
    this.imagenArchivo = null;
    this.imagenPreview = null;
  }

  regresar() {
    this.location.back();
  }
}