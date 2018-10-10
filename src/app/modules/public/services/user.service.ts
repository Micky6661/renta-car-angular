import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private urlEndPoint: string = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  public getUserByName(username: string): Observable<User> {
    return this.http.get<User>(this.urlEndPoint + '/username/' + username);
  }

}
