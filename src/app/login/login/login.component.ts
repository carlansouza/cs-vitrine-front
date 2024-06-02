import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserLogin, UserCreate } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user$: any[] = [];
  url = `${environment.api}/users`;

  loginCard = true;

  loginForm: FormGroup;
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
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

  ngOnInit(): void { }

  createUser(user: UserCreate) {
    return this.httpClient.post<UserLogin>(this.url, user);
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;  // Use signUpForm para obter os dados de cadastro
      this.httpClient.post<UserCreate>(this.url, formData).subscribe({
        next: () => {
          this.router.navigate(['/users']);
          return void 0; // Explicitly return void
        },
        error: error => console.error('There was an error!', error)
      });
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }
}
