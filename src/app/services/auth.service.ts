import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.api}/users/auth`;
  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.loggedIn.next(true);
    }
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.url + '/login', credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.setToken(response.token);
          this.loggedIn.next(true);
        }
      })
    )
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

  isUserLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  isLogout(): void {
    this.loggedIn.next(false);
    localStorage.removeItem('token');
  }
}
