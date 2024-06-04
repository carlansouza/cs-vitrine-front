import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserLogin, UserCreate } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private url = `${environment.api}/users`;

  constructor(private httpClient: HttpClient) {
  }

  singIn(user: UserLogin) {
    return this.httpClient.post<UserLogin>(this.url, user);
  }

  createUser(user: UserCreate) {
    return this.httpClient.post<UserCreate>(this.url, user);
  }

  getRole() {
    return localStorage.getItem('role');
  }

}
