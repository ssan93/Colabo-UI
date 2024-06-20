import { useContext } from "react";
import { IItem, IDiscount } from "interface";
import { getTotalPrice } from "utils";
import { CurrencyContext } from "contexts";

interface CartFooterProps {
  items: ReadonlyArray<IItem>;
  discounts: ReadonlyArray<IDiscount>;
}
export const CartFooter = ({ items, discounts }: CartFooterProps) => {
  const currency = useContext(CurrencyContext);
  const totalPrice = getTotalPrice(items, discounts, currency);

  return (
    <div className="sticky max-w-screen-sm w-full bg-white bottom-0 border-t-2 px-4 py-6">
      <div className="flex items-center justify-between">
        <p className="text-xl text-cyan-600 font-bold">합계</p>
        <p className="text-4xl font-bold">{totalPrice}</p>
      </div>
      <button
        disabled
        className="w-full bg-blue-500 text-white text-lg rounded-lg p-2 mt-6"
      >
        다음
      </button>
    </div>
  );
};
