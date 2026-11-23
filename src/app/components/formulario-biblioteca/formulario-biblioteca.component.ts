import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Biblioteca } from '../../models/biblioteca.model';
import { BibliotecaService } from '../../services/biblioteca.service';

type CampoBiblioteca = 'nombre' | 'direccion' | 'ciudad';

const CONTIENE_TEXTO = /\S/;

@Component({
  selector: 'app-formulario-biblioteca',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-biblioteca.component.html',
  styleUrl: './formulario-biblioteca.component.css',
})
export class FormularioBibliotecaComponent {
  private readonly bibliotecaService = inject(BibliotecaService);

  readonly registrada = output<Biblioteca>();

  readonly formulario = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(CONTIENE_TEXTO), Validators.maxLength(150)],
    }),
    direccion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(CONTIENE_TEXTO), Validators.maxLength(200)],
    }),
    ciudad: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(CONTIENE_TEXTO), Validators.maxLength(100)],
    }),
  });

  readonly enviando = signal(false);
  readonly mensajeExito = signal('');
  readonly mensajeError = signal('');

  campoInvalido(campo: CampoBiblioteca): boolean {
    const control = this.formulario.controls[campo];
    return control.invalid && (control.touched || control.dirty);
  }

  registrar(): void {
    this.mensajeExito.set('');
    this.mensajeError.set('');

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    this.bibliotecaService.registrar(this.formulario.getRawValue()).subscribe({
      next: (biblioteca) => {
        this.enviando.set(false);
        this.formulario.reset();
        this.mensajeExito.set('Biblioteca registrada correctamente.');
        this.registrada.emit(biblioteca);
      },
      error: (error: HttpErrorResponse) => {
        this.enviando.set(false);
        this.mensajeError.set(
          error.status === 400
            ? 'Los datos enviados no son válidos. Revisa los campos e intenta de nuevo.'
            : 'No fue posible registrar la biblioteca. Intenta de nuevo más tarde.',
        );
      },
    });
  }
}
