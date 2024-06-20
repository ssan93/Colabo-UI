import { IDiscount, IItem } from "interface";

const calculateTotalDiscount = (
  items: ReadonlyArray<IItem>,
  discounts: ReadonlyArray<IDiscount>,
  currency: string
) =>
  discounts.reduce(
    (acc, discount) => acc + calculateDiscount(items, discount, currency),
    0
  );

const calculateTotalPrice = (
  items: ReadonlyArray<IItem>,
  discounts: ReadonlyArray<IDiscount>,
  currency: string
) => {
  const totalDiscount = calculateTotalDiscount(items, discounts, currency);
  return (
    items.reduce(
      (acc: number, item: { price: number; count: number }) =>
        acc + item.price * item.count,
      0
    ) - totalDiscount
  );
};

const calculateDiscount = (
  items: ReadonlyArray<IItem>,
  discount: IDiscount,
  currency: string
) => {
  const calculatedDiscount =
    discount.itemsId.reduce((acc, id) => {
      const item = items.find((item) => item.id === id);
      return item ? acc + item.price * item.count : acc;
    }, 0) * discount.rate;

  switch (currency) {
    case "KRW":
      return Math.round(calculatedDiscount);
    default:
      // return 2 decimals
      return Math.round(calculatedDiscount * 100) / 100;
  }
};

export const formatPrice = (price: number, currency: string) => {
  switch (currency) {
    case "KRW":
      return price.toLocaleString("en-US") + "원";
    default:
      return price.toLocaleString("en-US") + "$";
  }
};

export const getDiscount = (
  items: ReadonlyArray<IItem>,
  discount: IDiscount,
  currency: string
) => formatPrice(calculateDiscount(items, discount, currency), currency);

export const getTotalPrice = (
  items: ReadonlyArray<IItem>,
  discounts: ReadonlyArray<IDiscount>,
  currency: string
) => formatPrice(calculateTotalPrice(items, discounts, currency), currency);
