import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { routeConstants, routeParams } from 'src/app/constants/route.constants';
import { CategoryDto } from 'src/app/dto/categpry-dto';
import { ProductDetailsDto } from 'src/app/dto/product-details-dto';
import { LoadHomeAction } from 'src/app/store/home/home.actions';
import { HomeSelectors } from 'src/app/store/home/home.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(HomeSelectors.categories)
  categories$!: Observable<CategoryDto[]>;

  @Select(HomeSelectors.topProducts)
  topProducts$!: Observable<ProductDetailsDto[]>

  routeConstants = routeConstants;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadHomeAction())
  }




}
