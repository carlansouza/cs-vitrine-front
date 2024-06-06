import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserLogin, UserCreate } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  returnUrl: string = '';

  urlCreate = `${environment.api}/users`;
  urlLogin = `${environment.api}/users/auth/login`;

  loginButton = true;

  loginForm: FormGroup;
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hashed_password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.route.data.subscribe(data => {});
  }

  createUser(user: UserCreate) {
    return this.httpClient.post<UserLogin>(this.urlCreate, user);
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      this.httpClient.post<UserCreate>(this.urlCreate, formData).subscribe({
        next: () => {
          this.successSignUp();
          this.router.navigate(['/users/auth/login']);
          return void 0;
        },
        error: error => console.error('There was an error!', error)
      });
    } else {
      this.snackBar.open('Preencha todos os campos corretamente!');
    }
  }

  onSignIn(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login(formData).subscribe({
        next: (response) => {
          this.successLogin();
          this.authService.setToken(response.token);
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          this.failedLogin();
          console.error('There was an error!', error);
        }
      });
     } else {
      this.failedLogin();
     }
  }

  successLogin(): void {
    this.openSnackBar('Login efetuado com sucesso!');
  }

  failedLogin(): void {
    this.openSnackBar('Usuário ou senha incorretos!');
  }

  successSignUp(): void {
    this.openSnackBar('Cadastro efetuado com sucesso!');
    window.location.reload();
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

}
