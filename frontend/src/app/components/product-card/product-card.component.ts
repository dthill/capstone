import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { routeConstants, routeParams } from 'src/app/constants/route.constants';
import { ProductDetailsDto } from 'src/app/dto/product-details-dto';
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

  constructor() { }

  ngOnInit(): void {
  }


  displayPrice(price: number) {
    return displayPrice(price)
  }

  addToCart() {
    console.log(this.product)
  }
}
