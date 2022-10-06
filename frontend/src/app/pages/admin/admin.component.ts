import { Component, OnInit } from '@angular/core';
import {routeConstants} from "../../constants/route.constants";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  routeConstants = routeConstants
  constructor() { }

  ngOnInit(): void {
  }

}
