import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoadCartAction, PaymentAction } from 'src/app/store/cart/cart.actions';
import { CartSelectors } from 'src/app/store/cart/cart.selectors';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @Select(CartSelectors.total)
  total$!: Observable<string>

  @Select(CartSelectors.isEmptyCart)
  isEmptyCart$!: Observable<boolean>

  @Select(CartSelectors.loading)
  loading$!: Observable<boolean>

  checkoutForm = new FormGroup({
    card: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    address: new FormControl('', [Validators.required])
  })

  get card() {
    return this.checkoutForm.get('card') as FormControl
  }

  get address() {
    return this.checkoutForm.get('address') as FormControl
  }

  payNow(event: Event) {
    event.preventDefault()
    this.store.dispatch(new PaymentAction({
      creditCardNumber: parseInt(this.card.value),
      address: this.address.value
    }))
  }

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.store.dispatch(new LoadCartAction())
  }

}
