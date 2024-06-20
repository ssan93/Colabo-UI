import { IDiscount, IItem } from "interface";

const calculateTotalDiscount = (
  items: ReadonlyArray<IItem>,
  discounts: ReadonlyArray<IDiscount>
) =>
  discounts.reduce(
    (acc, discount) =>
      acc +
      discount.itemsId!.reduce(
        (acc, id) =>
          acc +
          Math.round(
            items.find((item) => item.id === id)!.price *
              items.find((item) => item.id === id)!.count *
              discount.rate
          ),
        0
      ),
    0
  );

export const calculateTotalPrice = (
  items: ReadonlyArray<IItem>,
  discounts: ReadonlyArray<IDiscount>
) => {
  const totalDiscount = calculateTotalDiscount(items, discounts);
  return (
    items.reduce(
      (acc: number, item: { price: number; count: number }) =>
        acc + item.price * item.count,
      0
    ) - totalDiscount
  ).toLocaleString("en-US");
};
