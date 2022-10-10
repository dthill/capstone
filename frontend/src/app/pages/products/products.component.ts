import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { routeParams } from 'src/app/constants/route.constants';
import { CategoryDto } from 'src/app/dto/categpry-dto';
import { ProductDetailsDto } from 'src/app/dto/product-details-dto';
import { LoadAllProductsAction } from 'src/app/store/product-admin/product-admin.actions';
import { LoadSearchProductsAction } from 'src/app/store/products/products.actions';
import { ProductsSelectors } from 'src/app/store/products/products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Select(ProductsSelectors.categories)
  categories$!: Observable<CategoryDto[]>

  @Select(ProductsSelectors.products)
  products$!: Observable<ProductDetailsDto[]>

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const productSearch = params[routeParams.productSearch]
      const categoryId = parseInt(params[routeParams.categoryId])
      this.store.dispatch(new LoadSearchProductsAction({ productSearch, categoryId }))
    })
  }

}
