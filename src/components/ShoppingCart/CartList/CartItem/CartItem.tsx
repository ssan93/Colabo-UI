import { useContext } from "react";
import { IItem } from "interface";
import { Trash } from "@phosphor-icons/react";
import { CurrencyContext } from "contexts";
import { formatPrice } from "utils";

interface CartItemProps {
  item: IItem;
  handleItemChange: (id: string, count: number) => void;
  deleteItem: (id: string) => void;
}
export const CartItem = ({
  item,
  handleItemChange,
  deleteItem,
}: CartItemProps) => {
  const currency = useContext(CurrencyContext);

  return (
    <div className="flex justify-between gap-2">
      <div className="overflow-hidden">
        <p className="font-semibold text-justify text-ellipsis overflow-hidden">
          {item.name}
        </p>
        <p className="text-cyan-600 text-sm">
          {formatPrice(item.price, currency)}
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2 justify-end items-center">
          <input
            name="count"
            type="number"
            value={item.count}
            min={1}
            onChange={(e) => handleItemChange(item.id!, e.target.valueAsNumber)}
            className="w-12 h-8 p-2 bg-gray-100 rounded-full text-center text-cyan-600"
          />
          <p className="w-20 text-right">
            {formatPrice(item.price * item.count, currency)}
          </p>
          <button onClick={() => deleteItem(item.id!)}>
            <Trash size={20} weight="fill" className="text-red-700" />
          </button>
        </div>
      </div>
    </div>
  );
};
