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

 constructor(
  private router: Router,
  
  ) {}
  ngOnInit() {}

  irARegistrar() {
    this.router.navigate(['/registrar']);
  }

  recuperarContrasena(event: Event) {
    event.preventDefault();
    alert(' Revisa tu correo para restablecer tu contraseña.');
  }

  iniciarSesion() {
    const usuarioGuardado = localStorage.getItem('usuarioRegistrado');

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);

      if (this.correo === usuario.correo && this.password === usuario.password) {
        alert('Inicio de sesión exitoso');

        localStorage.setItem('usuarioActivo', JSON.stringify(usuario));

        this.router.navigate(['/perfil']);
      } else {
        alert(' Credenciales incorrectas');
      }
    }
  }
  regresar(): void {
    this.router.navigate(['/inicio']);
  }

}
