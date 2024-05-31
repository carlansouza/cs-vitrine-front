import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';
import { Car, CarCadastro } from 'src/app/models/car.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  carros$: any[] = [];

  url = `${environment.api}/cars`;

  carro: Car = {
    id: 0,
    name: '',
    brand: '',
    model: '',
    price: 0,
    image: '',
    d_alt: ''
  };

  constructor(
    private carService: CarService,
    private httpClient: HttpClient
    ) { }

  ngOnInit(): void {
    this.carService.obterCarros().subscribe((carros) => {
      this.carros$ = carros;
      console.log(this.carros$);
    });

  }

  cadastrarCarro(car: CarCadastro) {
    return this.httpClient.post<Car>(this.url, car);
  }

  deletarCarro(id: number) {
    this.carService.deletarCarro(id).subscribe(_ => this.obterCarros());
    //console.log('Carro deletado com sucesso!');
    window.location.reload();

  }

  atualizarCarro(car: Car) {
    return this.httpClient.put<Car>(`${this.url}/${car.id}`, car);
  }

  obterCarros() {
    return this.httpClient.get<Car[]>(this.url);
  }

  buttonClick(){
    if (!this.carro.name || !this.carro.brand || !this.carro.model ||
        !this.carro.price || !this.carro.d_alt) {
      console.log('Preencha todos os campos!');
      return;
    }

    if (this.carro.id) {
      this.atualizarId();
      this.limparFormulario();
      return;
    }

    this.incrementarId();

    this.carService.cadastrarCarro(this.carro).subscribe(_ => this.obterCarros());
    window.location.reload();
  }

  atualizarId(){
    this.carService.atualizarCarro(this.carro).subscribe(_ => this.obterCarros());
  }

  preencherFormulario(car: Car) {
    this.carro = car;
  }

  limparFormulario() {
    this.carro = {
      id: 0,
      name: '',
      brand: '',
      model: '',
      price: 0,
      image: '',
      d_alt: ''
    };
  }

  incrementarId() {
    this.carro.id = this.carros$.length + 1;
  }


}
