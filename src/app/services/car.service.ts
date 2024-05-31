import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Car } from "../models/car.model";

@Injectable({
  providedIn: 'root'
})

export class CarService {

  private url = `${environment.api}/cars`;

  constructor(private httpClient: HttpClient) {
  }

  obterCarros() {
    return this.httpClient.get<any>(this.url);
  }

  cadastrarCarro(car: Car) {
    return this.httpClient.post<Car>(this.url, car);
  }

  atualizarCarro(car: Car) {
    return this.httpClient.put<Car>(`${this.url}/${car.id}`, car);
  }

  deletarCarro(id: number) {
    return this.httpClient.delete<Car>(`${this.url}/${id}`);
  }

}
