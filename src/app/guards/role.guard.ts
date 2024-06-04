import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRoles = next.data['roles']; // Obtém os papéis esperados da rota
    const userRole = this.authService.getUserRole(); // Supondo que esta função retorna o papel do usuário atual

    // Verifica se o papel do usuário está na lista de papéis esperados
    if (expectedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']); // Redireciona para uma página de "não autorizado" se o papel não corresponder
      return false;
    }
  }
}



