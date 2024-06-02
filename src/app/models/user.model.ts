export interface User{
  id: number;
  name: string;
  email: string;
  hashed_password: string;
  role: string;
}

export type UserCreate = Omit<User, 'id'>;
export type UserLogin = Pick<User, 'email' | 'hashed_password'>;

