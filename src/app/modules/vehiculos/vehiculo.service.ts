import { Injectable } from '@angular/core';
import {Vehiculo} from './vehiculo';
import {VEHICULO} from './vehiculo.json';
import {Observable,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor() { }

  getVehiculos() : Observable<Vehiculo[]>{
    return of(VEHICULO);
  }
}
