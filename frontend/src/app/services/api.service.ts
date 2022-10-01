import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.get('http://localhost:8080/user/login', {
      responseType: 'json',
      headers: new HttpHeaders({
        Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
        ['Content-type']: 'application/json',
        ['X-Requested-With']: 'XMLHttpRequest'
      })
    })
  }

  logout() {
    return this.http.get('http://localhost:8080/user/logout')
  }
}
