import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { PerfilAgricultorComponent } from './perfil-agricultor/perfil-agricultor.component';
import { PerfilCompradorComponent } from './perfil-comprador/perfil-comprador.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  
  { path: '', redirectTo: 'perfil', pathMatch: 'full' },
  { path: 'perfil', component: PerfilComponent },
  { path: 'agricultor', component: PerfilAgricultorComponent },
  { path: 'comprador', component: PerfilCompradorComponent },
  {path: 'login', component:LoginComponent}

];

