import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,     
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo = '';
  password = '';

  correoguardado = 'user@12';
  passwordguardada = 'user123';

  constructor(private router: Router) {}

  iniciarSesion() {
    // Validar campos vacíos
    if (!this.correo || !this.password) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Validar correo y contraseña
    if (this.correo === this.correoguardado && this.password === this.passwordguardada) {
      // Redirigir a perfil
      this.router.navigate(['/perfil']);
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }

  recuperarContrasena(event: Event) {
    event.preventDefault();
    console.log('Recuperar contraseña');
  }
  irARegistrar() {
    this.router.navigate(['/registrar']);
  }

}
