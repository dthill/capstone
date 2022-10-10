import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/dto/categpry-dto';
import { SaveProductDto } from 'src/app/dto/save-product-dto';
import { LoadAllProductsAction, AddProductAction } from 'src/app/store/product-admin/product-admin.actions';
import { ProductAdminSelectors } from 'src/app/store/product-admin/product-admin.selectors';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductComponent {

  addProductForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(100)
    ]),
    description: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(200)
    ]),
    price: new FormControl(1, [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')]),
    enabled: new FormControl(true),
    categoryIds: new FormControl([]),
    imageUrl: new FormControl(''),
  })

  @Select(ProductAdminSelectors.possibleCategories)
  possibleCategories$!: Observable<CategoryDto[]>

  @Select(ProductAdminSelectors.error)
  error$!: Observable<any[]>

  constructor(private store: Store) { }


  get name() {
    return this.addProductForm.get('name');
  }

  get description() {
    return this.addProductForm.get('description')
  }

  get price() {
    return this.addProductForm.get('price')
  }

  get enabled() {
    return this.addProductForm.get('enabled')
  }

  get imageUrl() {
    return this.addProductForm.get('imageUrl')
  }

  submit(event: Event) {
    event.preventDefault();
    console.log(this.addProductForm.value)
    this.store.dispatch(new AddProductAction(this.addProductForm.value as SaveProductDto))
      .subscribe(() => {
        if (!this.store.selectSnapshot(ProductAdminSelectors.error)) {
          this.addProductForm.reset({ name: '', description: '', price: 1 })
        }
      })
  }

}
