import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { routeConstants, routeParams } from 'src/app/constants/route.constants';
import { LoadProductDetailsAction, UpdateProductDetailsAction } from 'src/app/store/product-details/product-details.actions';
import { ProductDetailsSelectors } from 'src/app/store/product-details/product-details.selectors';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProductComponent implements OnInit {
  editProductForm = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }, [Validators.required, Validators.min(1)]),
    name: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(100)
    ]),
    description: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(200)
    ]),
    price: new FormControl(1, [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')])
  })

  error$!: Observable<boolean>

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(
      new LoadProductDetailsAction(
        parseInt(this.activatedRoute.snapshot.paramMap.get(routeParams.productId) as string)
      )
    ).subscribe(() => {
      const productDetails = this.store.selectSnapshot(ProductDetailsSelectors.productDetails)
      if (productDetails.id) {
        this.editProductForm.setValue(productDetails as any)
        this.cd.markForCheck()
      }
    })
  }

  get id() {
    return this.editProductForm.get('id');
  }

  get name() {
    return this.editProductForm.get('name');
  }

  get description() {
    return this.editProductForm.get('description')
  }

  get price() {
    return this.editProductForm.get('price')
  }

  submit(event: Event) {
    event.preventDefault();
    this.store
      .dispatch(new UpdateProductDetailsAction({
        id: this.id?.value as number,
        name: this.name?.value as string,
        description: this.description?.value as string,
        price: parseInt(this.price?.value as any)
      }))
      .subscribe(() => {
        this.router.navigate([routeConstants.admin, routeConstants.productAdmin])
      })
  }
}
