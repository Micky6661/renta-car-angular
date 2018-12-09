import { Renta } from './renta';
import { DetalleRenta } from './detalle-renta';

export class RentaDTO {
  renta: Renta;
  inserted: DetalleRenta[];
  deleted: DetalleRenta[];
}
