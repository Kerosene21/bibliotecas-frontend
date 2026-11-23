import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Biblioteca, NuevaBiblioteca } from '../models/biblioteca.model';

@Injectable({
  providedIn: 'root',
})
export class BibliotecaService {
  private readonly http = inject(HttpClient);
  private readonly url = '/bibliotecas';

  consultar(): Observable<Biblioteca[]> {
    return this.http.get<Biblioteca[]>(this.url);
  }

  registrar(biblioteca: NuevaBiblioteca): Observable<Biblioteca> {
    return this.http.post<Biblioteca>(this.url, biblioteca);
  }
}
