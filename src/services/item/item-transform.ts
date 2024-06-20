import { IItemDB, IItem } from "interface";
import { v4 as uuid } from "uuid";

export const transformItemDBtoClient = (
  itemsDB: Record<string, IItemDB>
): ReadonlyArray<IItem> => {
  const items = Object.values(itemsDB).map((item: IItemDB) => {
    return {
      id: uuid(),
      count: item.count,
      name: item.name,
      price: item.price,
    };
  });

  return items;
};
