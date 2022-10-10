import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { routeConstants, routeParams } from 'src/app/constants/route.constants';
import { CategoryDto } from 'src/app/dto/categpry-dto';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  @Input()
  categories!: CategoryDto[] | null

  routeConstants = routeConstants;
  searchControl = new FormControl('')
  categoryControl = new FormControl('')

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const searchTerm = this.activatedRoute.snapshot.queryParamMap.get(routeParams.productSearch) || '';
    if (searchTerm) {
      this.searchControl.setValue(searchTerm);
    }
    const categoryId = parseInt(this.activatedRoute.snapshot.queryParamMap.get(routeParams.categoryId) as string);
    if (!isNaN(categoryId)) {
      this.categoryControl.setValue((categoryId as any))
    }

  }

  search(event: Event) {
    event.preventDefault();
    this.router.navigate([routeConstants.products], {
      queryParamsHandling: 'merge',
      queryParams: {
        [routeParams.productSearch]: this.searchControl.value || null,
        [routeParams.categoryId]: this.categoryControl.value || null
      }
    })
  }

}
