import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoadAllProductsAction } from 'src/app/store/product-admin/product-admin.actions';
import { ProductAdminSelectors } from 'src/app/store/product-admin/product-admin.selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  addProductForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(100)
    ]),
    description: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(200)
    ]),
    price: new FormControl(1, [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')])
  })

  @Select(ProductAdminSelectors.products)
  products$!: Observable<any[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadAllProductsAction())
  }

  get name() {
    return this.addProductForm.get('name');
  }

  get description() {
    return this.addProductForm.get('description')
  }

  get price() {
    return this.addProductForm.get('price')
  }
}
