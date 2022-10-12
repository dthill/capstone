import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { routeConstants, routeParams } from 'src/app/constants/route.constants';
import { ProductDetailsDto } from 'src/app/dto/product-details-dto';
import { AddToCartAction } from 'src/app/store/cart/cart.actions';
import { UserSelectors } from 'src/app/store/user/user.selectors';
import { displayPrice } from 'src/app/utilities/price.utilities';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
  routeConstants = routeConstants;

  @Input()
  product!: ProductDetailsDto;

  @Select(UserSelectors.loggedIn)
  loggedIn$!: Observable<boolean>;

  @Select(UserSelectors.loading)
  loading$!: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }


  displayPrice(price: number) {
    return displayPrice(price)
  }

  addToCart() {
    this.store.dispatch(new AddToCartAction(this.product))
  }
}
