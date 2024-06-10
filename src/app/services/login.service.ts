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

  getRole() {
    return localStorage.getItem('role');
  }

  updatePassword(user: UserLogin) {
    return this.httpClient.put<UserLogin>(this.url + '/alter/password', user);
  }
}
