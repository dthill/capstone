import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';

import { ExceptionHandlerService } from './exception-handler.service';

describe('ExceptionHandlerService', () => {
  let service: ExceptionHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([]), RouterTestingModule]
    });
    service = TestBed.inject(ExceptionHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
