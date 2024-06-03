import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserLogin, UserCreate } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user$: any[] = [];
  urlCreate = `${environment.api}/users`;
  urlLogin = `${environment.api}/users/login`;

  loginButton = true;

  loginForm: FormGroup;
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      hashed_password: ['', Validators.required]
    });

    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hashed_password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

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
          this.router.navigate(['/users']);
          return void 0;
        },
        error: error => console.error('There was an error!', error)
      });
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

  onSingIn(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.httpClient.post<UserLogin>(this.urlLogin, formData).subscribe({
        next: () => {
          this.authService.login(formData).subscribe(
            data => this.authService.setToken(data.token)
          );
          this.successLogin();
          this.router.navigate(['/search']);
          return void 0;
        },
        error: error => console.error('There was an error!', error)
      });
    }
  }

  // onSingIn(): void {
  //   if (this.loginForm.valid) {
  //     const formData = this.loginForm.value;
  //     this.authService.login(formData).subscribe({
  //       next: () => {
  //         this.successLogin();
  //         this.router.navigate(['/search']);
  //       },
  //       error: error => console.error('There was an error!', error)
  //     });
  //   }
  // }

  successLogin(): void {
    alert('Login efetuado com sucesso!');
  }

  successSignUp(): void {
    alert('Cadastro efetuado com sucesso!');
    window.location.reload();
  }

  loggout(): void {
    this.authService.logout();
    this.router.navigate(['/users/login']);
  }
}
