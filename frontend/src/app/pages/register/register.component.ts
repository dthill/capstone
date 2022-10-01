import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { routeConstants } from 'src/app/constants/route.constants';
import { RegisterAction } from 'src/app/store/user/user.actions';
import { UserSelectors } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200),
    ]),
  })

  @Select(UserSelectors.loading)
  loading$!: Observable<boolean>

  @Select(UserSelectors.error)
  error$!: Observable<boolean>

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  register(event: Event) {
    event.preventDefault();
    this.store
      .dispatch(new RegisterAction(this.email?.value as string, this.password?.value as string))
      .subscribe(() => {
        if (!this.store.selectSnapshot(UserSelectors.error)) {
          this.router.navigate([routeConstants.register, routeConstants.registerSuccess])
        }
      })
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }
}
