import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteProductAction, LoadAllProductsAction } from 'src/app/store/product-admin/product-admin.actions';
import { ProductAdminSelectors } from 'src/app/store/product-admin/product-admin.selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Select(ProductAdminSelectors.products)
  products$!: Observable<any[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadAllProductsAction())
  }

  delete(product: any) {
    this.store.dispatch(new DeleteProductAction(product))
  }


  trackByFn(index: number, product: any) {
    return product.id
  }
}
