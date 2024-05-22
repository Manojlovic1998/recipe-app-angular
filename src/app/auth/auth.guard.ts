import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable, inject } from '@angular/core';
import { Observable, map, take } from 'rxjs';

@Injectable()
export class PermissionService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;

        if (isAuth) {
          return true;
        }

        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}

export const canActivateRecipes: CanActivateFn = (route, state) => {
  return inject(PermissionService).canActivate();
};
