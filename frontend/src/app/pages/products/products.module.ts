import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductSearchModule } from 'src/app/components/product-search/product-search.module';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ProductSearchModule,
    ProductCardModule
  ]
})
export class ProductsModule { }
