import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('muestra el encabezado y los libros obtenidos de GET /bibliotecas', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    http.expectOne('/bibliotecas').flush([
      {
        id: 1,
        nombre: 'Biblioteca Central',
        direccion: 'Carrera 7',
        ciudad: 'Bogotá',
        libros: [{ id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anioPublicacion: 1967 }],
      },
    ]);
    await fixture.whenStable();

    const pagina = fixture.nativeElement as HTMLElement;
    expect(pagina.querySelector('h1')?.textContent).toContain('Sistema de bibliotecas');
    expect(pagina.querySelector('tbody')?.textContent).toContain('Cien años de soledad');
    expect(pagina.querySelector('tbody')?.textContent).toContain('Biblioteca Central');
  });
});
