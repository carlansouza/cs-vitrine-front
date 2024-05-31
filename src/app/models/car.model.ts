export interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  price: number;
  image: string;
  d_alt: string;
}

export type CarCadastro = Omit<Car, 'id'>;
