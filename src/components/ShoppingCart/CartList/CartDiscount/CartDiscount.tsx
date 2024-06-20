import { useContext } from "react";
import { IDiscount, IItem } from "interface";
import { CaretDown, Trash } from "@phosphor-icons/react";
import { CurrencyContext } from "contexts";

interface CartDiscountProps {
  items: ReadonlyArray<IItem>;
  discount: IDiscount;
  openDiscountModal: (discount: IDiscount) => void;
  deleteDiscount: (id: string) => void;
}
export const CartDiscount = ({
  items,
  discount,
  openDiscountModal,
  deleteDiscount,
}: CartDiscountProps) => {
  const currency = useContext(CurrencyContext);

  return (
    <div className="flex justify-between gap-2">
      <div className="overflow-hidden">
        <p className="font-semibold text-ellipsis overflow-hidden">{`${
          discount.name
        }(${Math.round(discount.rate * 10000) / 100}%)`}</p>
        <p className="text-cyan-600 text-sm text-justify">
          {discount
            .itemsId!.map((id) => {
              const item = items.find((item) => item.id === id);
              if (!item) return "";
              return item.count > 1 ? `${item.name}x${item.count}` : item.name;
            })
            .join(", ")}
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2 justify-end items-center">
          <button
            onClick={() => openDiscountModal(discount)}
            className="flex justify-center items-center w-max h-8 pl-2 pr-1 gap-1 bg-gray-100 rounded-full text-center text-cyan-600"
          >
            수정
            <CaretDown size={16} />
          </button>
          <p className="w-20 text-right">
            -
            {Math.round(
              discount.itemsId!.reduce((acc, id) => {
                const item = items.find((item) => item.id === id);
                return acc + item!.price * item!.count;
              }, 0) * discount.rate
            ).toLocaleString("en-US")}
            {currency}
          </p>
          <button onClick={() => deleteDiscount(discount.id!)}>
            <Trash size={20} weight="fill" className="text-red-700" />
          </button>
        </div>
      </div>
    </div>
  );
};
