import { CategoryDto } from "src/app/dto/categpry-dto";

export class LoadCategoryDetailsAction {
  static readonly type = '[CategoryDetails] Load category details';
  constructor(public categoryId: number) { }
}

export class UpdateCategoryDetailsAction {
  static readonly type = '[CategoryDetails] Update category details';
  constructor(public category: CategoryDto) { }
}
