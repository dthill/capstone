import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { UserState } from './user/user.state';

const states = [UserState]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot(states, {
      developmentMode: !environment.production,
    })
  ]
})
export class StoreModuleModule { }
