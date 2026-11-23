import { Component, OnInit, inject, signal } from '@angular/core';
import { FormularioBibliotecaComponent } from './components/formulario-biblioteca/formulario-biblioteca.component';
import { TablaLibrosComponent } from './components/tabla-libros/tabla-libros.component';
import { Biblioteca } from './models/biblioteca.model';
import { BibliotecaService } from './services/biblioteca.service';

@Component({
  selector: 'app-root',
  imports: [FormularioBibliotecaComponent, TablaLibrosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly bibliotecaService = inject(BibliotecaService);

  readonly bibliotecas = signal<Biblioteca[]>([]);
  readonly cargando = signal(true);
  readonly errorConsulta = signal('');

  ngOnInit(): void {
    this.cargarBibliotecas();
  }

  cargarBibliotecas(): void {
    this.errorConsulta.set('');
    this.bibliotecaService.consultar().subscribe({
      next: (bibliotecas) => {
        this.bibliotecas.set(bibliotecas);
        this.cargando.set(false);
      },
      error: () => {
        this.errorConsulta.set(
          'No fue posible consultar las bibliotecas. Verifica que el backend esté en ejecución.',
        );
        this.cargando.set(false);
      },
    });
  }
}
