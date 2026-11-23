import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BibliotecaService } from './biblioteca.service';

describe('BibliotecaService', () => {
  let service: BibliotecaService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BibliotecaService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('consulta las bibliotecas con GET /bibliotecas', () => {
    service.consultar().subscribe((bibliotecas) => expect(bibliotecas).toEqual([]));

    const solicitud = http.expectOne('/bibliotecas');
    expect(solicitud.request.method).toBe('GET');
    solicitud.flush([]);
  });

  it('registra una biblioteca con POST /bibliotecas', () => {
    const nueva = { nombre: 'Biblioteca Sur', direccion: 'Calle 1 # 2-3', ciudad: 'Cali' };
    service.registrar(nueva).subscribe();

    const solicitud = http.expectOne('/bibliotecas');
    expect(solicitud.request.method).toBe('POST');
    expect(solicitud.request.body).toEqual(nueva);
    solicitud.flush({ id: 3, ...nueva, libros: [] }, { status: 201, statusText: 'Created' });
  });
});
