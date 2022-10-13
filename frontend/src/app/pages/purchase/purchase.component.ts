import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { routeConstants, routeParams } from 'src/app/constants/route.constants';
import { PurchaseDto } from 'src/app/dto/purchase-dto';
import { LoadPurchaseAction } from 'src/app/store/purchases/purchases.actions';
import { PurchasesSelectors } from 'src/app/store/purchases/purchases.selectors';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  routeConstants = routeConstants
  @Select(PurchasesSelectors.total)
  total$!: Observable<string>

  @Select(PurchasesSelectors.purchase)
  purchase$!: Observable<PurchaseDto>

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.dispatch(
      new LoadPurchaseAction(parseInt(this.activatedRoute.snapshot.paramMap.get(routeParams.purchaseId) as string))
    )
  }

}
