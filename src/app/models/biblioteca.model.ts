import { Libro } from './libro.model';

export interface Biblioteca {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  libros: Libro[];
}

export type NuevaBiblioteca = Omit<Biblioteca, 'id' | 'libros'>;
