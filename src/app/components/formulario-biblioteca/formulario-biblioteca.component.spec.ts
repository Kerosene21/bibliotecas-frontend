import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Biblioteca } from '../../models/biblioteca.model';
import { FormularioBibliotecaComponent } from './formulario-biblioteca.component';

describe('FormularioBibliotecaComponent', () => {
  let component: FormularioBibliotecaComponent;
  let fixture: ComponentFixture<FormularioBibliotecaComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioBibliotecaComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioBibliotecaComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => http.verify());

  it('no envía la solicitud si hay campos vacíos', async () => {
    component.formulario.setValue({ nombre: '   ', direccion: '', ciudad: '' });
    component.registrar();
    await fixture.whenStable();

    http.expectNone('/bibliotecas');
    expect(fixture.nativeElement.textContent).toContain('El nombre es obligatorio');
  });

  it('registra la biblioteca, limpia el formulario y emite el resultado', async () => {
    const registradas: Biblioteca[] = [];
    component.registrada.subscribe((biblioteca) => registradas.push(biblioteca));
    component.formulario.setValue({ nombre: 'Biblioteca Sur', direccion: 'Calle 1 # 2-3', ciudad: 'Cali' });

    component.registrar();
    const solicitud = http.expectOne('/bibliotecas');
    expect(solicitud.request.method).toBe('POST');
    solicitud.flush({ id: 3, nombre: 'Biblioteca Sur', direccion: 'Calle 1 # 2-3', ciudad: 'Cali', libros: [] });
    await fixture.whenStable();

    expect(registradas.length).toBe(1);
    expect(component.formulario.getRawValue()).toEqual({ nombre: '', direccion: '', ciudad: '' });
    expect(fixture.nativeElement.textContent).toContain('Biblioteca registrada correctamente.');
  });

  it('muestra un mensaje si el backend rechaza la solicitud', async () => {
    component.formulario.setValue({ nombre: 'Biblioteca Sur', direccion: 'Calle 1', ciudad: 'Cali' });

    component.registrar();
    http.expectOne('/bibliotecas').flush(null, { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('No fue posible registrar la biblioteca');
  });
});
