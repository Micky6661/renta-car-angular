import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente';
import { catchError } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private urlEndPoint = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  public getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  public getClienteById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(this.urlEndPoint + '/' + id);
  }

  public insertCliente(cliente: Cliente) {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders})
      .pipe(
        catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  public updateCliente(cliente: Cliente) {
    return this.http.put<Cliente>(this.urlEndPoint + '/' + cliente.id, cliente, {headers: this.httpHeaders})
    .pipe(
      catchError((error, caught) => {
      return of(error);
    }) as any);
  }

  public deleteCliente(id: string) {
    return this.http.delete(this.urlEndPoint + '/' + id, {headers: this.httpHeaders})
    .pipe(
      catchError((error, caught) => {
      return of(error);
    }) as any);
  }
}
