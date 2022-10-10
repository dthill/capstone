import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryDto } from '../dto/categpry-dto';
import { ProductAdminDto } from '../dto/product-admin-dto';
import { ProductDetailsDto } from '../dto/product-details-dto';
import { SaveCategoryDto } from '../dto/save-category-dto';
import { SaveProductDto } from '../dto/save-product-dto';
import { UserSelectors } from '../store/user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private store: Store) { }

  me() {
    return this.http.get(environment.api + '/user/login', {
      responseType: 'json',
      withCredentials: true,
      headers: new HttpHeaders({
        Authorization:
          `Basic ${window.btoa(`${this.store.selectSnapshot(UserSelectors.email)}:${this.store.selectSnapshot(UserSelectors.password)}`)}`,
        ['Content-type']: 'application/json',
        ['X-Requested-With']: 'XMLHttpRequest'
      })
    })
  }

  login(email: string, password: string) {
    return this.http.get(environment.api + '/user/login', {
      responseType: 'json',
      withCredentials: true,
      headers: new HttpHeaders({
        Authorization: `Basic ${window.btoa(`${email}:${password}`)}`,
        ['Content-type']: 'application/json',
        ['X-Requested-With']: 'XMLHttpRequest'
      })
    })
  }

  register(email: string, password: string) {
    return this.http.post(environment.api + '/user/register',
      { email, password },
      {
        withCredentials: false,
        headers: new HttpHeaders({
          ['Content-type']: 'application/json',
          ['Response-type']: 'application/json',
          ['X-Requested-With']: 'XMLHttpRequest'
        })
      })
  }

  logout() {
    return this.http.get(environment.api + '/user/logout')
  }

  getAllProducts(): Observable<ProductAdminDto> {
    return this.http.get(environment.api + '/products') as Observable<any>
  }

  addProduct(product: SaveProductDto) {
    return this.http.post(environment.api + '/add/product', product,
      {
        responseType: 'json',
        withCredentials: true,
        headers: new HttpHeaders({
          Authorization:
            `Basic ${window.btoa(`${this.store.selectSnapshot(UserSelectors.email)}:${this.store.selectSnapshot(UserSelectors.password)}`)}`,
          ['Content-type']: 'application/json',
          ['Response-type']: 'application/json',
          ['X-Requested-With']: 'XMLHttpRequest'
        })
      })
  }

  getProductDetails(productId: number) {
    return this.http.get(`${environment.api}/products/${productId}`,
      {
        responseType: 'json',
        withCredentials: false,
        headers: new HttpHeaders({
          ['Content-type']: 'application/json',
          ['Response-type']: 'application/json',
          ['X-Requested-With']: 'XMLHttpRequest'
        })
      })
  }

  updateProduct(product: ProductDetailsDto) {
    return this.http.put(environment.api + '/update/product', product,
      {
        responseType: 'json',
        withCredentials: true,
        headers: new HttpHeaders({
          Authorization:
            `Basic ${window.btoa(`${this.store.selectSnapshot(UserSelectors.email)}:${this.store.selectSnapshot(UserSelectors.password)}`)}`,
          ['Content-type']: 'application/json',
          ['Response-type']: 'application/json',
          ['X-Requested-With']: 'XMLHttpRequest'
        })
      })
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${environment.api}/delete/product/${productId}`,
      {
        responseType: 'json',
        withCredentials: true,
        headers: new HttpHeaders({
          Authorization:
            `Basic ${window.btoa(`${this.store.selectSnapshot(UserSelectors.email)}:${this.store.selectSnapshot(UserSelectors.password)}`)}`,
          ['Content-type']: 'application/json',
          ['Response-type']: 'application/json',
          ['X-Requested-With']: 'XMLHttpRequest'
        })
      })
  }

  getAllCategories() {
    return this.http.get(environment.api + '/categories')
  }

  addCategory(category: SaveCategoryDto) {
    return this.http.post(environment.api + '/add/category', category,
      {
        responseType: 'json',
        withCredentials: true,
        headers: new HttpHeaders({
          Authorization:
            `Basic ${window.btoa(`${this.store.selectSnapshot(UserSelectors.email)}:${this.store.selectSnapshot(UserSelectors.password)}`)}`,
          ['Content-type']: 'application/json',
          ['Response-type']: 'application/json',
          ['X-Requested-With']: 'XMLHttpRequest'
        })
      })
  }

  getCategoryDetails(categoryId: number) {
    return this.http.get(`${environment.api}/categories/${categoryId}`,
      {
        responseType: 'json',
        withCredentials: false,
        headers: new HttpHeaders({
          ['Content-type']: 'application/json',
          ['Response-type']: 'application/json',
          ['X-Requested-With']: 'XMLHttpRequest'
        })
      })
  }

  updateCategory(category: CategoryDto) {
    return this.http.put(environment.api + '/update/category', category,
      {
        responseType: 'json',
        withCredentials: true,
        headers: new HttpHeaders({
          Authorization: `Basic ${window.btoa(`dthill@gmx.net:test1`)}`,
          ['Content-type']: 'application/json',
          ['Response-type']: 'application/json',
          ['X-Requested-With']: 'XMLHttpRequest'
        })
      })
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(`${environment.api}/delete/category/${categoryId}`,
      {
        responseType: 'json',
        withCredentials: true,
        headers: new HttpHeaders({
          Authorization: `Basic ${window.btoa(`dthill@gmx.net:test1`)}`,
          ['Content-type']: 'application/json',
          ['Response-type']: 'application/json',
          ['X-Requested-With']: 'XMLHttpRequest'
        })
      })
  }

  getHome(): Observable<ProductAdminDto> {
    return this.http.get(`${environment.api}/products/top`,
      {
        responseType: 'json',
        withCredentials: false,
        headers: new HttpHeaders({
          ['Content-type']: 'application/json',
          ['Response-type']: 'application/json',
          ['X-Requested-With']: 'XMLHttpRequest'
        })
      }) as Observable<any>
  }
}
