import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // ← esta línea es clave
  imports: [RouterOutlet], // ← esto habilita las rutas
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agromarket';
}
