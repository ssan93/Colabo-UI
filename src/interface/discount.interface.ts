export interface IDiscount {
  id: string;
  name: string;
  rate: number;
  itemsId: ReadonlyArray<string>;
}

export interface IDiscountDB {
  name: string;
  rate: number;
}
