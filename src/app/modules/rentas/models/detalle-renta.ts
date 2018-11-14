import { Vehiculo } from './../../vehiculos/models/vehiculo';
import { Renta } from './renta';

export class DetalleRenta {
   id: number;
   renta: Renta;
   vehiculo: Vehiculo;
   fechaInicioRenta: Date;
   fechaFinRenta: Date;
   monto: number;
}
