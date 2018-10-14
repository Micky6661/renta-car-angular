import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
import { Marca } from '../models/marca';
import { Modelo } from '../models/modelo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private urlEndPoint = 'http://localhost:8080/api/vehiculos';

  constructor(private http: HttpClient) { }

  public getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.urlEndPoint);
  }

//   async getVehiculoById(carId: string) {
//     const response = await this.http.get<Vehiculo>(this.urlEndPoint + '/' + carId).toPromise();
//     return response;
//  }

  public getVehiculoById(carId: string): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(this.urlEndPoint + '/' + carId);
  }

  public insertVehiculo(car: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.urlEndPoint, car);
  }

  public updateVehiculo(car: Vehiculo): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(this.urlEndPoint + car.id, car);
  }

  public deleteVehiculo(carId: string): Observable<any> {
    return this.http.delete(this.urlEndPoint + carId);
  }

  public getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.urlEndPoint + '/marcas');
  }

  public getModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(this.urlEndPoint + '/modelos');
  }

}
