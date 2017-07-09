import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  isLoggedIn: boolean;
  constructor(private http: Http) { }
  logn (userName, password): Observable<Response>  {
    const formData = new FormData();
    formData.append('username', userName);
    formData.append('password', password);
    return this.http.post('http://localhost:8080/auth/login', formData);
      /* if (userName === 'test' && password === 'test') {
        this.isLoggedIn = true;
        return Observable.of(true);
      } else {
        this.isLoggedIn = false;
        return Observable.of(false);
      }*/
  }
  whoami(): Observable<Response> {
    return this.http.get('http://10.15.216.147:8080/whoami');
  }
}
