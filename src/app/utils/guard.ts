import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken();
    if (token) {
      // Se houver um token, permita o acesso à rota solicitada
      return true;
    } else {
      // Se não houver token, redirecionar o usuário para a tela de login e salvar a rota de destino
      return this.router.createUrlTree(['/users/login'], { queryParams: { returnUrl: state.url } });
    }
  }
}
