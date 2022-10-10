import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductSearchModule } from 'src/app/components/product-search/product-search.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProductSearchModule,
    CarouselModule.forRoot(),
    ProductCardModule
  ]
})
export class HomeModule { }
