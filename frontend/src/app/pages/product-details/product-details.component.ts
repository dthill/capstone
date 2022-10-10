import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { routeParams } from 'src/app/constants/route.constants';
import { ProductDetailsDto } from 'src/app/dto/product-details-dto';
import { AddToCartAction } from 'src/app/store/add-to-cart/add-to-cart.actions';
import { AddToCartSelectors } from 'src/app/store/add-to-cart/add-to-cart.selectors';
import { AddToCartState } from 'src/app/store/add-to-cart/add-to-cart.state';
import { LoadProductDetailsAction } from 'src/app/store/product-details/product-details.actions';
import { ProductDetailsSelectors } from 'src/app/store/product-details/product-details.selectors';
import { UserSelectors } from 'src/app/store/user/user.selectors';
import { displayPrice } from 'src/app/utilities/price.utilities';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Select(ProductDetailsSelectors.productDetails)
  product$!: Observable<ProductDetailsDto>

  @Select(UserSelectors.loggedIn)
  loggedIn$!: Observable<boolean>

  @Select(AddToCartSelectors.loading)
  loading$!: Observable<boolean>

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new LoadProductDetailsAction(params[routeParams.productId]))
    })
  }

  displayPrice(price: number) {
    return displayPrice(price)
  }

  addToCart(product: ProductDetailsDto) {
    this.store.dispatch(new AddToCartAction(product))
  }
}
