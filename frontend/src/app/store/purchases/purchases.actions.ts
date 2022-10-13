export class LoadPurchaseAction {
  static readonly type = '[Purchases] Load purchase by id';
  constructor(public purchaseId: number) { }
}

export class LoadPurchasesAction {
  static readonly type = '[Purchases] Load purchases';
  constructor() { }
}
