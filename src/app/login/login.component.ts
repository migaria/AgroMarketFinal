import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

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
    private usuarioService: UsuarioService
  ) {}

  irARegistrar() {
    this.router.navigate(['/registrar']);
  }

  recuperarContrasena(event: Event) {
    event.preventDefault();
    alert('Revisa tu correo');
  }

  iniciarSesion() {

    const usuario = {
      correo: this.correo,
      password: this.password
    };

    this.usuarioService.login(usuario)
      .subscribe({
        next: (respuesta) => {

          if (respuesta === 'COMPRADOR') {
            alert('Bienvenido Comprador');
            this.router.navigate(['/comprador']);
          } else if (respuesta === 'VENDEDOR') {
            alert('Bienvenido Agricultor');
            this.router.navigate(['/agricultor'])
          } else{
            alert(respuesta);
          }

        },
        error: () => {
          alert('Error de conexión');
        }
      });
  }

  regresar(): void {
    this.router.navigate(['/inicio']);
  }
}