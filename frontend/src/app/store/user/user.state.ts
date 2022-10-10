import { Injectable } from '@angular/core';
import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { catchError, concatMap, EMPTY, of, tap } from 'rxjs';
import { UserDto } from 'src/app/dto/user-dto';
import { ApiService } from 'src/app/services/api.service';
import { CheckMeAction, LoginAction, LogoutAction, RegisterAction } from './user.actions';

export class UserStateModel {
  user!: UserDto
  loading!: boolean;
  error!: boolean;
}

const defaults: UserStateModel = {
  user: {
    email: '',
    password: '',
    isAdmin: false
  },
  loading: false,
  error: false
};

@State<UserStateModel>({
  name: 'user',
  defaults
})
@Injectable()
export class UserState implements NgxsOnInit {

  constructor(private apiService: ApiService) { }

  ngxsOnInit(ctx: StateContext<UserStateModel>) {
    ctx.patchState({ user: this.getPersistedUser() })
  }

  @Action(CheckMeAction)
  me(ctx: StateContext<UserStateModel>) {
    ctx.patchState({ loading: true })
    return this.apiService.me().pipe(
      catchError(error => {
        console.error(error)
        return of(null)
      }),
      tap(response => {
        ctx.patchState({ loading: false })
        if (!response) {
          ctx.patchState({ user: defaults.user })
          this.deletePersistedUser()
        }
      })
    )
  }

  @Action(LoginAction)
  login(ctx: StateContext<UserStateModel>, { email, password }: LoginAction) {
    ctx.patchState({ loading: true })
    return this.apiService.login(email, password).pipe(
      catchError(error => {
        console.error(error)
        return of(null)
      }),
      tap((response: any) => {
        ctx.patchState({ loading: false })
        if (!response) {
          ctx.patchState({ error: true, user: defaults.user })
          this.deletePersistedUser();
        } else {
          ctx.patchState({ error: false, user: { email, password, isAdmin: response.isAdmin } })
          this.persistUser(ctx.getState().user)
        }
      })
    )
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<UserStateModel>) {
    ctx.patchState({ loading: true })
    return this.apiService.logout().pipe(
      catchError(error => {
        console.error(error)
        return of(null)
      }),
      tap(response => {
        ctx.patchState(defaults)
        this.deletePersistedUser()
      })
    )
  }

  @Action(RegisterAction)
  register(ctx: StateContext<UserStateModel>, { email, password }: RegisterAction) {
    ctx.patchState({ loading: true })
    return this.apiService.register(email, password).pipe(
      catchError(error => {
        console.error(error)
        return of(null)
      }),
      tap((response: any) => {
        if (!response || !response.email) {
          ctx.patchState({ ...defaults, error: true, })
        } else {
          ctx.patchState(defaults)
        }
      })
    )
  }

  persistUser(user: UserDto) {
    localStorage.setItem('pgfsd-user', JSON.stringify(user))
  }

  getPersistedUser(): UserDto {
    if (localStorage.getItem('pgfsd-user')) {
      return JSON.parse(localStorage.getItem('pgfsd-user') as string)
    }
    return defaults.user
  }

  deletePersistedUser() {
    localStorage.removeItem('pgfsd-user')
  }
}
