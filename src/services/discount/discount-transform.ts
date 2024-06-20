import { IDiscountDB, IDiscount } from "interface";
import { v4 as uuid } from "uuid";

export const transformDiscountDBtoClient = (
  discountDB: Record<string, IDiscountDB>
): ReadonlyArray<IDiscount> => {
  const discount = Object.values(discountDB).map((item: IDiscountDB) => {
    return {
      id: uuid(),
      name: item.name,
      rate: item.rate,
      itemsId: [],
    };
  });

  return discount;
};
