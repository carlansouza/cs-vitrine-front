import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.api}/users`;


  constructor(private http: HttpClient) {}

  login(credentials: { email: string, hashed_password: string }): Observable<any> {
    return this.http.post<any>(this.url + '/login', credentials);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
