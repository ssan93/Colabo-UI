import { useContext, useState } from "react";
import { IDiscount, IItem } from "interface";
import { CheckFat } from "@phosphor-icons/react";
import { SelectModal } from "components";
import { CurrencyContext } from "contexts";
import { formatPrice } from "utils";

interface SelectDiscountModalProps {
  items: ReadonlyArray<IItem>;
  discountModal: IDiscount;
  handleDiscountChange: (id: string, itemsId: ReadonlyArray<string>) => void;
  closeDiscountModal: () => void;
}
export const SelectDiscountModal = ({
  items,
  discountModal,
  handleDiscountChange,
  closeDiscountModal,
}: SelectDiscountModalProps) => {
  const currency = useContext(CurrencyContext);

  const [selectedItemsForDiscount, setSelectedItemsForDiscount] = useState<
    ReadonlyArray<string>
  >(discountModal.itemsId || []);

  const handleDiscountClick = (id: string) => {
    if (selectedItemsForDiscount.includes(id)) {
      setSelectedItemsForDiscount(
        selectedItemsForDiscount.filter((itemId) => itemId !== id)
      );
    } else {
      setSelectedItemsForDiscount([...selectedItemsForDiscount, id]);
    }
  };

  const applyDiscount = (
    discountId: string,
    itemsId: ReadonlyArray<string>
  ) => {
    closeDiscountModal();
    handleDiscountChange(discountId, itemsId);
  };

  return (
    <SelectModal
      title="회원 할인"
      closeModal={closeDiscountModal}
      submitModal={() =>
        applyDiscount(discountModal.id, selectedItemsForDiscount)
      }
    >
      <div className="flex flex-col gap-4 pt-8 min-h-40">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleDiscountClick(item.id!)}
            className="flex justify-between gap-4"
          >
            <div className="w-full">
              <p className="font-semibold line-clamp-2">{item.name}</p>
              <p className="text-cyan-600 text-sm">
                {formatPrice(item.price, currency)}
              </p>
            </div>
            {selectedItemsForDiscount.includes(item.id) && (
              <div className="flex items-center text-cyan-600 w-6">
                <CheckFat size={24} weight="fill" />
              </div>
            )}
          </div>
        ))}
      </div>
    </SelectModal>
  );
};
