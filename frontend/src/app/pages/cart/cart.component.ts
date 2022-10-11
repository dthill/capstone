import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { routeConstants } from 'src/app/constants/route.constants';
import { ProductDetailsDto } from 'src/app/dto/product-details-dto';
import { PurchaseDto } from 'src/app/dto/purchase-dto';
import { LoadCartAction } from 'src/app/store/cart/cart.actions';
import { CartSelectors } from 'src/app/store/cart/cart.selectors';
import { displayPrice } from 'src/app/utilities/price.utilities';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Select(CartSelectors.cart)
  cart$!: Observable<PurchaseDto>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadCartAction())
  }

  displayPrice(price: number): string {
    return displayPrice(price)
  }

  getTotal(products: ProductDetailsDto[]) {
    return displayPrice(products.reduce((accumulator, product) => {
      return accumulator += product.price;
    }, 0))
  }

  checkout() {
    this.router.navigate([routeConstants.checkout])
  }
}
