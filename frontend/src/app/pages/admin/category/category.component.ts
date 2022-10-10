import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteCategoryAction, LoadAllCategoriesAction } from 'src/app/store/category-admin/category-admin.actions';
import { CategoryAdminSelectors } from 'src/app/store/category-admin/category-admin.selectors';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {

  @Select(CategoryAdminSelectors.categories)
  categories$!: Observable<any>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadAllCategoriesAction())
  }


  delete(category: any) {
    this.store.dispatch(new DeleteCategoryAction(category))
  }


  trackByFn(index: number, category: any) {
    return category.id
  }
}
