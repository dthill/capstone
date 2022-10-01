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

  login() {
    this.apiService.login('user', 'Test123456')
      .pipe(catchError(error => {
        return of(error)
      }))
      .subscribe((response) => {
        console.log(response)
      })
  }

  logout() {
    this.apiService.logout().subscribe(console.log)
  }

  invalidLogin() {
    this.apiService.login('user1', 'Test123456')
      .pipe(catchError(error => {
        return of(-1)
      }))
      .subscribe((response) => {
        console.log(response)
      })
  }
}
