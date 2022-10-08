import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { ProductDetailsDto } from '../dto/product-details-dto';
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
        Authorization: `Basic ${window.btoa(`dthill@gmx.net:test1`)}`,
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

  getAllProducts() {
    return this.http.get(environment.api + '/products')
  }

  addProduct(product: SaveProductDto) {
    return this.http.post(environment.api + '/add/product', product,
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
          Authorization: `Basic ${window.btoa(`dthill@gmx.net:test1`)}`,
          ['Content-type']: 'application/json',
          ['Response-type']: 'application/json',
          ['X-Requested-With']: 'XMLHttpRequest'
        })
      })
  }

  deleteProduct(product: ProductDetailsDto) {
    return this.http.delete(environment.api + '/delete/product',
      {
        body: product,
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
}
