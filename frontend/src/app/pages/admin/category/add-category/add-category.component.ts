import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SaveCategoryDto } from 'src/app/dto/save-category-dto';
import { AddCategoryAction } from 'src/app/store/category-admin/category-admin.actions';
import { CategoryAdminSelectors } from 'src/app/store/category-admin/category-admin.selectors';
import { ProductAdminSelectors } from 'src/app/store/product-admin/product-admin.selectors';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCategoryComponent {
  addCategoryForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(100)
    ]),
    description: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(200)
    ]),
    price: new FormControl(1, [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')])
  })

  @Select(CategoryAdminSelectors.error)
  error$!: Observable<any[]>

  constructor(private store: Store) { }


  get name() {
    return this.addCategoryForm.get('name');
  }

  get description() {
    return this.addCategoryForm.get('description')
  }

  get price() {
    return this.addCategoryForm.get('price')
  }

  submit(event: Event) {
    event.preventDefault();
    this.store.dispatch(new AddCategoryAction(this.addCategoryForm.value as SaveCategoryDto))
      .subscribe(() => {
        if (!this.store.selectSnapshot(CategoryAdminSelectors.error)) {
          this.addCategoryForm.reset({ name: '', description: '' })
        }
      })
  }

}
