import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeParams } from 'src/app/constants/route.constants';
import { PurchaseComponent } from './purchase.component';

const routes: Routes = [{ path: `:${routeParams.purchaseId}`, component: PurchaseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
