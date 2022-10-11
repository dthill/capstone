import { ProductDetailsDto } from "src/app/dto/product-details-dto";

export class AddToCartAction {
  static readonly type = '[Cart] Add item';
  constructor(public product: ProductDetailsDto) { }
}


export class LoadCartAction {
  static readonly type = '[Cart] Load cart';
  constructor() { }
}
