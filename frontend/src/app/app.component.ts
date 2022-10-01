import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, of } from 'rxjs';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }


}
