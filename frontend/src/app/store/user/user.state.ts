import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { catchError, concatMap, EMPTY, of, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LoginAction, LogoutAction, RegisterAction } from './user.actions';

export class UserStateModel {
  user!: {
    email?: string,
    isAdmin?: boolean
  };
  loading!: boolean;
  error!: boolean;
}

const defaults: UserStateModel = {
  user: {},
  loading: false,
  error: false
};

@State<UserStateModel>({
  name: 'user',
  defaults
})
@Injectable()
export class UserState {

  constructor(private apiService: ApiService) { }

  @Action(LoginAction)
  login(ctx: StateContext<UserStateModel>, { email, password }: LoginAction) {
    ctx.patchState({ loading: true })
    return this.apiService.login(email, password).pipe(
      catchError(error => {
        console.error(error)
        return of(null)
      }),
      tap(response => {
        ctx.patchState({ loading: false })
        if (!response) {
          ctx.patchState({ error: true, user: defaults.user })
        } else {
          ctx.patchState({ error: false, user: response as any })
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
}
