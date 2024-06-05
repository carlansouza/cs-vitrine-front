import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  login(): void {
    this.authService.isLogin();
  }

  logout(): void {
    this.authService.logout();
    alert('Logout efetuado com sucesso!');
  }


}
