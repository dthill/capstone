import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';


@NgModule({
  declarations: [
    AdminComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
