import { PaymentDto } from "src/app/dto/payment-dto";
import { ProductDetailsDto } from "src/app/dto/product-details-dto";

export class AddToCartAction {
  static readonly type = '[Cart] Add item';
  constructor(public product: ProductDetailsDto) { }
}


export class LoadCartAction {
  static readonly type = '[Cart] Load cart';
  constructor() { }
}

export class DeleteFromCartAction {
  static readonly type = '[Cart] Delete from cart';
  constructor(public productId: number) { }
}

export class PaymentAction {
  static readonly type = '[Cart] Pay cart';
  constructor(public payment: PaymentDto) { }
}
