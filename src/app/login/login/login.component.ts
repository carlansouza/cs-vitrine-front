import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserLogin, UserCreate } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';


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
  updatePasswordButton = false;
  signUpButton = false;

  loginForm: FormGroup;
  signUpForm: FormGroup;
  updatePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private loginService: LoginService
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

    this.updatePasswordForm = this.fb.group({
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
        error: (error) => {
            this.userExists();
            console.error('There was an error!', error);
        }
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

  onUpdatePassword(): void {
    if (this.updatePasswordForm.valid) {
      const formData = this.updatePasswordForm.value;
      this.loginService.updatePassword(formData).subscribe({
        next: response => {
          this.snackBar.open('Senha atualizada com sucesso!', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar-success']
          });
          this.showLogin();
        },
        error: error => {
          if (error.status === 404) {
            this.snackBar.open('Usuário não encontrado', 'Fechar', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snackbar-error']
            });
          } else {
            console.error('There was an error!', error);
            this.snackBar.open('Erro ao atualizar senha', 'Fechar', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snackbar-error']
            });
          }
        }
      });
    } else {
      this.snackBar.open('Preencha todos os campos corretamente!', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snackbar-error']
      });
    }
  }

  successLogin(): void {
    this.openSnackBar('Login efetuado com sucesso!');
  }

  failedLogin(): void {
    this.openSnackBar('Usuário ou senha incorretos!');
  }

  successUpdatePassword(): void {
    this.openSnackBar('Senha atualizada com sucesso!');
  }

  successSignUp(): void {
    this.openSnackBar('Cadastro efetuado com sucesso!');
    window.location.reload();
  }

  userExists(): void {
    this.openSnackBar('Usuário já cadastrado! Tente outro e-mail.');
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  showLogin() {
    this.loginButton = true;
    this.updatePasswordButton = false;
    this.signUpButton = false;
  }

  showUpdatePassword() {
    this.loginButton = false;
    this.updatePasswordButton = true;
    this.signUpButton = false;
  }

  showSignUp() {
    this.loginButton = false;
    this.updatePasswordButton = false;
    this.signUpButton = true;
  }

}
