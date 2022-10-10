import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { routeConstants, routeParams } from 'src/app/constants/route.constants';
import { CategoryDto } from 'src/app/dto/categpry-dto';
import { LoadCategoryDetailsAction, UpdateCategoryDetailsAction } from 'src/app/store/category-details/category-details.actions';
import { CategoryDetailsSelectors } from 'src/app/store/category-details/category-details.selectors';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  editCategoryForm = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }, [Validators.required, Validators.min(1)]),
    name: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(100)
    ]),
    description: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(200)
    ]),
  })

  @Select(CategoryDetailsSelectors.error)
  error$!: Observable<any[]>

  constructor(private store: Store,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(
      new LoadCategoryDetailsAction(
        parseInt(this.activatedRoute.snapshot.paramMap.get(routeParams.categoryId) as string)
      )
    ).subscribe(() => {
      const categoryDetails = this.store.selectSnapshot(CategoryDetailsSelectors.category)
      if (categoryDetails.id) {
        this.editCategoryForm.setValue(categoryDetails as any)
        this.cd.detectChanges()
      }
    })
  }


  get id() {
    return this.editCategoryForm.get('id')
  }

  get name() {
    return this.editCategoryForm.get('name');
  }

  get description() {
    return this.editCategoryForm.get('description')
  }

  submit(event: Event) {
    event.preventDefault();
    this.store.dispatch(new UpdateCategoryDetailsAction(
      {
        id: this.id?.value as number,
        name: this.name?.value as string,
        description: this.description?.value as string
      }
    ))
      .subscribe(() => {
        if (!this.store.selectSnapshot(CategoryDetailsSelectors.error)) {
          this.router.navigate([routeConstants.admin, routeConstants.categoryAdmin])
        }
      })
  }

}
