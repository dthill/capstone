import { SelectorContext } from "@angular/compiler";
import { Selector } from "@ngxs/store";
import { UserState, UserStateModel } from "./user.state";

export class UserSelectors {
  @Selector([UserState])
  public static user(state: UserStateModel): { email?: string, isAdmin?: boolean } {
    return state.user
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
