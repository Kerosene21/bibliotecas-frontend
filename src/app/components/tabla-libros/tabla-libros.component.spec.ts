import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Biblioteca } from '../../models/biblioteca.model';
import { TablaLibrosComponent } from './tabla-libros.component';

describe('TablaLibrosComponent', () => {
  let fixture: ComponentFixture<TablaLibrosComponent>;

  const bibliotecas: Biblioteca[] = [
    {
      id: 1,
      nombre: 'Biblioteca Central',
      direccion: 'Carrera 7',
      ciudad: 'Bogotá',
      libros: [{ id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anioPublicacion: 1967 }],
    },
    {
      id: 2,
      nombre: 'Biblioteca Norte',
      direccion: 'Calle 170',
      ciudad: 'Bogotá',
      libros: [
        { id: 2, titulo: 'El coronel no tiene quien le escriba', autor: 'Gabriel García Márquez', anioPublicacion: 1961 },
      ],
    },
    { id: 3, nombre: 'Biblioteca Sur', direccion: 'Calle 1', ciudad: 'Cali', libros: [] },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaLibrosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaLibrosComponent);
  });

  it('muestra una fila por libro con el nombre de su biblioteca', async () => {
    fixture.componentRef.setInput('bibliotecas', bibliotecas);
    await fixture.whenStable();

    const filas = Array.from(fixture.nativeElement.querySelectorAll('tbody tr') as NodeListOf<HTMLElement>);
    const celdas = filas.map((fila) => Array.from(fila.querySelectorAll('td')).map((celda) => celda.textContent?.trim()));

    expect(celdas).toEqual([
      ['Cien años de soledad', 'Gabriel García Márquez', '1967', 'Biblioteca Central'],
      ['El coronel no tiene quien le escriba', 'Gabriel García Márquez', '1961', 'Biblioteca Norte'],
    ]);
  });

  it('indica cuando no hay libros', async () => {
    fixture.componentRef.setInput('bibliotecas', []);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('No hay libros registrados.');
  });
});
