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
    this.router.navigate(['/inicio']);
    alert('Sesión cerrada correctamente.');
  }
}
