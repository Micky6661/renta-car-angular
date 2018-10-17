import { Cliente } from '../../clientes/models/cliente';
import { User } from '../../public/models/user';
import { EstadoRenta } from './estado-renta';
import { DetalleRenta } from './detalle-renta';

export class Renta {
  id: number;
  cliente: Cliente;
  fecha: string;
  estado: EstadoRenta;
  user: User;
  observacion: string;
  montoTotal: number;
  detalleRenta: DetalleRenta[];
}
