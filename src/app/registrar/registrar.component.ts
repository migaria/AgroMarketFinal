import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  usuario = {
    nombre: '',
    correo: '',
    telefono: '',
    password: '',
    confirmar: '',
    rol: ''
  };

  mensajeExito = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  regresar() {
    this.router.navigate(['/login']);
  }

  validarNombre(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    this.usuario.nombre = input.value;
  }

  validarTelefono(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.usuario.telefono = input.value;
  }

  registrar() {

    const usuarioData = {
      nombre: this.usuario.nombre,
      correo: this.usuario.correo,
      telefono: this.usuario.telefono,
      password: this.usuario.password,
      confirmarPassword: this.usuario.confirmar,
      rol: this.usuario.rol
    };

    this.usuarioService.registrar(usuarioData)
      .subscribe({
        next: (respuesta) => {
          alert(respuesta);
          this.router.navigate(['/login']);
        },
        error: () => {
          alert('Error al registrar');
        }
      });
  }

  cancelar() {
    this.usuario = {
      nombre: '',
      correo: '',
      telefono: '',
      password: '',
      confirmar: '',
      rol: ''
    };

    this.mensajeExito = '';
  }
}