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
    const expectedRole = next.data['role'] as string;
    const userRole = this.authService.getUserRole();
    console.log('userRole: ', userRole);

    if (userRole === expectedRole) {
      return true;
    } else {
      // Redirecionar se o usuário não tiver a role necessária
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
