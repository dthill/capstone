import { CategoryDto } from "src/app/dto/categpry-dto";
import { SaveCategoryDto } from "src/app/dto/save-category-dto";

export class LoadAllCategoriesAction {
  static readonly type = '[CategoryAdmin] Load all categories';
  constructor() { }
}


export class AddCategoryAction {
  static readonly type = '[CategoryAdmin] Add category';
  constructor(public category: SaveCategoryDto) { }
}


export class DeleteCategoryAction {
  static readonly type = '[CategoryAdmin] Delete category';
  constructor(public category: CategoryDto) { }
}
