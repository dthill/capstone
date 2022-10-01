import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { routeConstants } from 'src/app/constants/route.constants';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuccessComponent implements OnInit {
  routeConstants = routeConstants
  constructor() { }

  ngOnInit(): void {
  }

}
