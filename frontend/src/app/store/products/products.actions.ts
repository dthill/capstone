import { ProductSearchDto } from "src/app/dto/product-search-dto";

export class LoadSearchProductsAction {
  static readonly type = '[Products] Load search products';
  constructor(public productSearch: ProductSearchDto) { }
}
