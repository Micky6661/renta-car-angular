import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Renta } from '../models/renta';
import { catchError } from 'rxjs/internal/operators';
import { EstadoRenta } from '../models/estado-renta';

@Injectable({
  providedIn: 'root'
})

export class RentaService {

  private urlEndPoint = 'http://localhost:8080/api/rentas';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  public getRentas(): Observable<Renta[]> {
    return this.http.get<Renta[]>(this.urlEndPoint);
  }

  public getById(id: string): Observable<Renta> {
    return this.http.get<Renta>(this.urlEndPoint + '/' + id);
  }

  public getEstadosRentas(): Observable<EstadoRenta[]> {
    return this.http.get<EstadoRenta[]>(this.urlEndPoint + '/estados');
  }

  public insert(renta: Renta) {
    return this.http.post<Renta>(this.urlEndPoint, renta, {headers: this.httpHeaders})
      .pipe(
        catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  public update(renta: Renta) {
    return this.http.put<Renta>(this.urlEndPoint + '/' + renta.id, renta, {headers: this.httpHeaders})
    .pipe(
      catchError((error, caught) => {
      return of(error);
    }) as any);
  }

  public delete(id: string) {
    return this.http.delete(this.urlEndPoint + '/' + id, {headers: this.httpHeaders})
    .pipe(
      catchError((error, caught) => {
      return of(error);
    }) as any);
  }
}
