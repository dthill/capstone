import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError, EMPTY, of } from 'rxjs';
import { routeConstants } from './constants/route.constants';
import { ApiService } from './services/api.service';
import { CheckMeAction } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routeConstants = routeConstants
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new CheckMeAction())
  }


}
