import { Vehiculo } from './../../vehiculos/models/vehiculo';
import { Renta } from './renta';

export class DetalleRenta {
  private id: number;
  private renta: Renta;
  private vehiculo: Vehiculo;
  private fechaInicioRenta: string;
  private fechaFinRenta: string;
  private monto: number;
}
