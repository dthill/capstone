import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, catchError, Observable, of, take } from 'rxjs';
import { routeConstants } from 'src/app/constants/route.constants';
import { ApiService } from 'src/app/services/api.service';
import { LoginAction } from 'src/app/store/user/user.actions';
import { UserSelectors } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  @Select(UserSelectors.loading)
  loading$!: Observable<boolean>

  @Select(UserSelectors.error)
  error$!: Observable<boolean>

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  login(event: Event) {
    event.preventDefault()
    this.store.dispatch(
      new LoginAction(this.email?.value as string, this.password?.value as string)
    ).pipe(take(1)).subscribe(() => {
      if (!this.store.selectSnapshot(UserSelectors.error)) {
        this.router.navigate([routeConstants.home])
      }
    })
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }
}
