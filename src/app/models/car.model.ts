export interface Car {
  id: number;
  nome: string;
  marca: string;
  modelo: string;
  preco: number;
  imagem: string;
  d_alt: string;
}

export type CarCadastro = Omit<Car, 'id'>;
