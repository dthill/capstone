import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { routeConstants } from '../constants/route.constants';
import { LogoutAction } from '../store/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class ExceptionHandlerService implements ErrorHandler {

  constructor(private store: Store, private router: Router) { }

  handleError(error: any): void {
    if (error?.status === 401) {
      this.store.dispatch(new LogoutAction()).subscribe(() => {
        this.router.navigate([routeConstants.login])
      })
    }
  }
}
