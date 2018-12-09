import { Modelo } from './../models/modelo';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  private urlEndPoint = 'http://' + window.location.hostname + ':8080/api/modelos';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  public getModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(this.urlEndPoint);
  }

  public getModeloById(id: string): Observable<Modelo> {
    return this.http.get<Modelo>(this.urlEndPoint + '/' + id);
  }

  public insertModelo(modelo: Modelo) {
    return this.http.post<Modelo>(this.urlEndPoint, modelo, {headers: this.httpHeaders})
      .pipe(
        catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  public updateModelo(modelo: Modelo) {
    return this.http.put<Modelo>(this.urlEndPoint + '/' + modelo.id, modelo, {headers: this.httpHeaders})
    .pipe(
      catchError((error, caught) => {
      return of(error);
    }) as any);
  }

  public deleteModelo(id: string) {
    return this.http.delete(this.urlEndPoint + '/' + id, {headers: this.httpHeaders})
    .pipe(
      catchError((error, caught) => {
      return of(error);
    }) as any);
  }
}
