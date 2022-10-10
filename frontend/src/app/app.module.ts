import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModuleModule } from './store/store-module.module'
import { ExceptionHandlerService } from './services/exception-handler.service';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModuleModule
  ],
  providers: [{ provide: ErrorHandler, useClass: ExceptionHandlerService }],
  bootstrap: [AppComponent],
})
export class AppModule { }
