import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.api}/users/auth`;


  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.url + '/login', credentials);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getDecodedToken(): any {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token não encontrado');
    }
    if (token.split('.').length !== 3) {
        throw new Error('Token inválido: formato incorreto');
    }
    return jwtDecode(token);
}

  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.role : null;

  }

  logout(): void {
    localStorage.removeItem('token');
  }

}
