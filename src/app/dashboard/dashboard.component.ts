import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';
import { Car, CarCadastro } from 'src/app/models/car.model';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  defaultImage = 'assets/carro-produção.jpg';

   token$ = this.authService.getDecodedToken();
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token$.token}`);

  constructor(
    private carService: CarService,
    private httpClient: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.carService.obterCarros().subscribe((carros) => {
      this.carros$ = carros;
    });

  }

  cadastrarCarro(car: CarCadastro) {
    return this.httpClient.post<Car>(this.url, car);
  }


  deletarCarro(id: number) {
    this.httpClient.delete(`${this.url}/${id}`, { headers: this.headers }).subscribe(
      response => {
        console.log('Carro deletado com sucesso!', response);
        const snackBarRef = this.snackBar.open('Carro deletado com sucesso!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.obterCarros();
        snackBarRef.afterDismissed().subscribe(() => {
          window.location.reload(); // Recarrega a página após o snackbar ser fechado
        });
      },
      error => {
        console.error('Erro ao deletar o carro', error);
        this.snackBar.open('Erro ao deletar o carro. Por favor, tente novamente.', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    );
  }

  atualizarCarro(car: Car) {
    return this.httpClient.put<Car>(`${this.url}/${car.id}`, car);
  }

  obterCarros() {
    return this.httpClient.get<Car[]>(this.url);
  }

  buttonClick(){
    if (!this.carro.name || !this.carro.brand || !this.carro.model || !this.carro.price) {
      let missingFields = [];
      if (!this.carro.name) missingFields.push('Nome');
      if (!this.carro.brand) missingFields.push('Marca');
      if (!this.carro.model) missingFields.push('Modelo');
      if (!this.carro.price) missingFields.push('Preço');

      this.snackBar.open(`Preencha os campos: ${missingFields.join(', ')} corretamente!`, 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }

    if (this.carro.id) {
      this.atualizarId();
      this.limparFormulario();
      return;
    }

    if (!this.carro.image) {
      this.carro.image = this.defaultImage;
      this.carro.d_alt = "Imagem de um carro em produção!"
    } else {
      this.carro.d_alt = "Imagem de um " + this.carro.name + " " + this.carro.model
    }

    this.carService.cadastrarCarro(this.carro).subscribe(_ => this.obterCarros());
    this.resetComponent();
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

  resetComponent() {
    this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
    }
    );
  }

}
