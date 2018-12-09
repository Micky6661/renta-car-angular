import { Injectable } from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
import { Marca } from '../models/marca';
import { Modelo } from '../models/modelo';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private urlEndPoint = 'http://' + window.location.hostname + ':8080/api/vehiculos';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  public getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.urlEndPoint);
  }

  public getVehiculoById(carId: string): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(this.urlEndPoint + '/' + carId);
  }

  public insertVehiculo(car: Vehiculo) {
    return this.http.post<Vehiculo>(this.urlEndPoint, car, {headers: this.httpHeaders})
      .pipe(
        catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  public updateVehiculo(car: Vehiculo) {
    return this.http.put<Vehiculo>(this.urlEndPoint + '/' + car.id, car, {headers: this.httpHeaders})
    .pipe(
      catchError((error, caught) => {
      return of(error);
    }) as any);
  }

  public deleteVehiculo(carId: string) {
    return this.http.delete(this.urlEndPoint + '/' + carId, {headers: this.httpHeaders})
    .pipe(
      catchError((error, caught) => {
      return of(error);
    }) as any);
  }

  public getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.urlEndPoint + '/marcas');
  }

  public getModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(this.urlEndPoint + '/modelos');
  }

  async validarVehiculo(matricula: string, chasis: string) {
    const response = this.http.get<Vehiculo>(this.urlEndPoint + '/validar/' + matricula + '/' + chasis).toPromise();
    return response;
  }
}
