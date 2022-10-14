import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ApiService } from 'src/app/services/api.service';
import { CategoryAdminState } from './category-admin.state';

describe('CategoryAdmin actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CategoryAdminState])],
      providers: [{ provide: ApiService, useValue: {} }]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action', () => {

  });

});
