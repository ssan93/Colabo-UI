import { useState } from "react";
import { IDiscount, IItem } from "interface";
import { CartDiscount, CartItem, SelectDiscountModal } from "components";

interface CartListProps {
  items: ReadonlyArray<IItem>;
  discounts: ReadonlyArray<IDiscount>;
  handleItemChange: (id: string, count: number) => void;
  handleDiscountChange: (id: string, itemsId: ReadonlyArray<string>) => void;
  deleteItem: (id: string) => void;
  deleteDiscount: (id: string) => void;
}
export const CartList = ({
  items,
  discounts,
  handleItemChange,
  handleDiscountChange,
  deleteItem,
  deleteDiscount,
}: CartListProps) => {
  const [discountModal, setDiscountModal] = useState<IDiscount>();

  const openDiscountModal = (discount: IDiscount) => {
    setDiscountModal(discount);
  };

  const closeDiscountModal = () => {
    setDiscountModal(undefined);
  };

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          handleItemChange={handleItemChange}
          deleteItem={deleteItem}
        />
      ))}
      {discounts.map((discount) => (
        <CartDiscount
          key={discount.id}
          items={items}
          discount={discount}
          openDiscountModal={openDiscountModal}
          deleteDiscount={deleteDiscount}
        />
      ))}
      {discountModal && (
        <SelectDiscountModal
          items={items}
          discountModal={discountModal}
          handleDiscountChange={handleDiscountChange}
          closeDiscountModal={closeDiscountModal}
        />
      )}
    </div>
  );
};
