import { Component, computed, input } from '@angular/core';
import { Biblioteca } from '../../models/biblioteca.model';

@Component({
  selector: 'app-tabla-libros',
  imports: [],
  templateUrl: './tabla-libros.component.html',
  styleUrl: './tabla-libros.component.css',
})
export class TablaLibrosComponent {
  readonly bibliotecas = input.required<Biblioteca[]>();

  readonly filas = computed(() =>
    this.bibliotecas().flatMap((biblioteca) =>
      biblioteca.libros.map((libro) => ({ libro, biblioteca: biblioteca.nombre })),
    ),
  );
}
