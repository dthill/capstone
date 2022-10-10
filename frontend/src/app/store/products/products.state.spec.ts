import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ProductsState } from './products.state';
import { LoadSearchProductsAction } from './products.actions';

describe('Products actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ProductsState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new LoadSearchProductsAction('item-1'));
    store.select(state => state.products.items).subscribe((items: string[]) => {
      expect(items).toEqual(jasmine.objectContaining(['item-1']));
    });
  });

});
