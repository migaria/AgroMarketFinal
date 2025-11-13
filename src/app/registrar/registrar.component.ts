import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    confirmar: ''
  };
  
  mensajeExito = ''; 

  constructor(private router: Router) {}

  validarNombre(event: Event) {
    const input = event.target as HTMLInputElement;
    // Solo permite letras, tildes y espacios
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    this.usuario.nombre = input.value;
  }

  validarTelefono(event: Event) {
    const input = event.target as HTMLInputElement;
    // Solo permite números
    input.value = input.value.replace(/[^0-9]/g, '');
    this.usuario.telefono = input.value;
  }

  registrar() {
    const { nombre, correo, telefono, password, confirmar } = this.usuario;


     if (nombre && correo && telefono && password && confirmar) {
      if (password !== confirmar) {
        alert(' password no coinciden.');
        return;
      }
      // Guardar usuario en el localStorage
      const usuarioData = { nombre, correo, telefono, password };
      localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioData));
      
      // Mensaje de éxito
      this.mensajeExito = '✅ Registro exitoso. Redirigiendo al login...';
      console.log('Usuario registrado:', { nombre, correo, telefono
        
      });
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      } else {
      alert('Por favor, completa todos los campos.');
    }
    
  }
cancelar() {
 
  this.usuario = {
    nombre: '',
    correo: '',
    telefono: '',
    password: '',
    confirmar: ''
  };
  
  this.mensajeExito = '';
 
}


 
}

