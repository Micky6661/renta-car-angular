import { Marca } from './marca';
import { Modelo } from './modelo';

export class Vehiculo {
  id: number;
  marca: Marca;
  modelo: Modelo;
  matricula: string;
  chasis: number;
  motor: string;
  disponible: boolean;
  observacion: string;
}
