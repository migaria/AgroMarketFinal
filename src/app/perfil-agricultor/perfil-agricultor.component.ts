import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

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
  cantidadInvalida = false;

  soloLetras(event: any) {
    event.target.value = event.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    this.nombre = event.target.value;
  }

  soloNumeros(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
    this.cantidad = +event.target.value;
    this.cantidadInvalida = this.cantidad < 1;
  }

  soloDecimales(event: any) {
    event.target.value = event.target.value.replace(/[^0-9.]/g, '');
    this.precio = parseFloat(event.target.value);
  }

  guardar() {
    if (this.nombre && this.cantidad && this.precio && this.tipo) {
      this.mensajeExito = '✅ Producto guardado exitosamente.';
      console.log('Producto guardado:', {
        nombre: this.nombre,
        cantidad: this.cantidad,
        precio: this.precio,
        tipo: this.tipo
      });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  cancelar() {
    this.nombre = '';
    this.cantidad = null;
    this.precio = null;
    this.tipo = '';
    this.mensajeExito = '';
  }
}