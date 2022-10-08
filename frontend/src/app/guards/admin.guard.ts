import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { concatMap, Observable, of } from 'rxjs';
import { routeConstants } from '../constants/route.constants';
import { UserSelectors } from '../store/user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(UserSelectors.isAdmin).pipe(concatMap(isAdmin => {
      if (isAdmin) {
        return of(true);
      }
      return this.router.navigate([routeConstants.login])
    }));
  }

}
