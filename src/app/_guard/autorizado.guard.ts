// import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';

// import { inject } from '@angular/core';
// import { session } from '../utils/session';

// export const authGuard: CanActivateFn =
//   (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//     const router = inject(Router);
//     const protectedRoutes: string[] = ['search', 'meusVeiculos'];
//     return protectedRoutes.includes(state.url) && !session ? router.navigate(['/login']) : session.session$;

//   };
