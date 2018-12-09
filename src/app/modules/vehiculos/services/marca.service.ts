import { Injectable } from '@angular/core';
import { Marca } from '../models/marca';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private urlEndPoint = 'http://' + window.location.hostname + ':8080/api/marcas';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  public getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.urlEndPoint);
  }

  public getMarcaById(id: string): Observable<Marca> {
    return this.http.get<Marca>(this.urlEndPoint + '/' + id);
  }

  public insertMarca(marca: Marca) {
    return this.http.post<Marca>(this.urlEndPoint, marca, {headers: this.httpHeaders})
      .pipe(
        catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  public updateMarca(marca: Marca) {
    return this.http.put<Marca>(this.urlEndPoint + '/' + marca.id, marca, {headers: this.httpHeaders})
    .pipe(
      catchError((error, caught) => {
      return of(error);
    }) as any);
  }

  public deleteMarca(id: string) {
    return this.http.delete(this.urlEndPoint + '/' + id, {headers: this.httpHeaders})
    .pipe(
      catchError((error, caught) => {
      return of(error);
    }) as any);
  }
}
