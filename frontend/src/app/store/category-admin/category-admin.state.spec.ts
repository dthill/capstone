import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CategoryAdminState } from './category-admin.state';
import { CategoryAdminAction } from './category-admin.actions';

describe('CategoryAdmin actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CategoryAdminState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new CategoryAdminAction('item-1'));
    store.select(state => state.categoryAdmin.items).subscribe((items: string[]) => {
      expect(items).toEqual(jasmine.objectContaining(['item-1']));
    });
  });

});
