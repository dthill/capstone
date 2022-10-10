import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CategoryDetailsState } from './category-details.state';
import { CategoryDetailsAction } from './category-details.actions';

describe('CategoryDetails actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CategoryDetailsState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new CategoryDetailsAction('item-1'));
    store.select(state => state.categoryDetails.items).subscribe((items: string[]) => {
      expect(items).toEqual(jasmine.objectContaining(['item-1']));
    });
  });

});
