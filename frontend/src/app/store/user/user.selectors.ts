import { SelectorContext } from "@angular/compiler";
import { Selector } from "@ngxs/store";
import { UserState, UserStateModel } from "./user.state";

export class UserSelectors {
  @Selector([UserState])
  public static user(state: UserStateModel): { email?: string, isAdmin?: boolean } {
    return state.user
  }

  @Selector([UserState])
  public static loggedIn(state: UserStateModel): boolean {
    return !!state.user.email
  }

  @Selector([UserState])
  public static isAdmin(state: UserStateModel): boolean {
    return !!state.user.isAdmin
  }

  @Selector([UserState])
  public static loading(state: UserStateModel): boolean {
    return state.loading
  }

  @Selector([UserState])
  public static error(state: UserStateModel): boolean {
    return state.error
  }
}
