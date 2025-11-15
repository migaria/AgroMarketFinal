import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent {
  constructor(private router: Router) {}

  cerrarSesion(): void {
    // Limpia datos guardados de sesión o usuario
    //localStorage.clear();
    //sessionStorage.clear();
    // Redirige al login
    this.router.navigate(['/inicio']);
    // Muestra mensaje opcional
    alert('Sesión cerrada correctamente.');
  }
}
