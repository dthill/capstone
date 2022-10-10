import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './product-search.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductSearchComponent
  ],
  exports: [
    ProductSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class ProductSearchModule { }
