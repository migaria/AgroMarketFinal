import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private api = 'http://localhost:9090/api/usuarios';

  constructor(private http: HttpClient) {}

  registrar(usuario: any): Observable<any> {
    return this.http.post(`${this.api}/registro`, usuario, {
      responseType: 'text'
    });
  }

  login(usuario: any): Observable<any> {
    return this.http.post(`${this.api}/login`, usuario, {
      responseType: 'text'
    });
  }

  listar(): Observable<any> {
    return this.http.get(this.api);
  }
}