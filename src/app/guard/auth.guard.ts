import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AuthService);
  const router = inject(Router);

  if (!loginService.isLoggedIn()) {
    router.navigate(['/login'], { replaceUrl: true });
  }

  return loginService.isLoggedIn();
};
