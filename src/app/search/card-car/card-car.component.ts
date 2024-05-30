import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-card-car',
  templateUrl: './card-car.component.html',
  styleUrls: ['./card-car.component.scss']

})
export class CardCarComponent implements OnInit {


  carro$: any[] = [];


  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carService.obterCarros().subscribe((carros) => {
      this.carro$ = carros;
    });
  }

}
