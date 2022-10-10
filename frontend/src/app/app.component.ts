import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { catchError, EMPTY, Observable, of, take } from 'rxjs';
import { routeConstants } from './constants/route.constants';
import { CheckMeAction, LogoutAction } from './store/user/user.actions';
import { UserSelectors } from './store/user/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routeConstants = routeConstants

  @Select(UserSelectors.loggedIn)
  loggedIn$!: Observable<boolean>

  @Select(UserSelectors.isAdmin)
  isAdmin$!: Observable<boolean>

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(new CheckMeAction())
  }

  logout() {
    this.store.dispatch(new LogoutAction()).pipe(take(1)).subscribe(() => {
      this.router.navigate([routeConstants.home])
    })
  }

}
