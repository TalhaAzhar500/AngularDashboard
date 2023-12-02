import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const data: any = localStorage.getItem('userData');
  const userData = JSON.parse(data);

  if (userData) {
    if (route.routeConfig?.path === 'login') {
      router.navigate(['/dashboard/home']);
      return false;
    }

    if (route.routeConfig?.path === 'admins') {
      if (userData?.role !== 'super') {
        router.navigate(['/dashboard/home']);
        return false;
      }
    }

    if (route.routeConfig?.path === 'projects') {
      if (userData?.role === 'user') {
        router.navigate(['/dashboard/home']);
        return false;
      }
    }

    return true;
  } else {
    if (route.routeConfig?.path === 'login') {
      return true;
    }
    router.navigate(['']);
    return false;
  }
};
