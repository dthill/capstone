import { ProductDetailsDto } from "src/app/dto/product-details-dto";
import { SaveProductDto } from "src/app/dto/save-product-dto";

export class LoadAllProductsAction {
  static readonly type = '[ProductAdmin] Load all products';
  constructor() { }
}


export class AddProductAction {
  static readonly type = '[ProductAdmin] Add product';
  constructor(public product: SaveProductDto) { }
}

export class DeleteProductAction {
  static readonly type = '[ProductAdmin] Delete product';
  constructor(public product: ProductDetailsDto) { }
}
