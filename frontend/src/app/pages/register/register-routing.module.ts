import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConstants } from 'src/app/constants/route.constants';
import { RegisterComponent } from './register.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [{ path: routeConstants.registerSuccess, component: SuccessComponent }, { path: '', component: RegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
