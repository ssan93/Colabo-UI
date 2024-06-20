import { AddButton, ModalHeader } from "components";

interface CartHeaderProps {
  name: string;
  date: string;
  closeModal: () => void;
  openServiceMenu: () => void;
  openDiscountMenu: () => void;
}
export const CartHeader = ({
  name,
  date,
  closeModal,
  openServiceMenu,
  openDiscountMenu,
}: CartHeaderProps) => {
  return (
    <div className="sticky w-full bg-white top-0 border-b-2 border-dashed">
      <ModalHeader closeModal={closeModal}>
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm text-gray-300 font-semibold">{date}</p>
      </ModalHeader>
      <div className="flex gap-2 mt-4 px-4 py-6">
        <AddButton title="시술" handleClick={openServiceMenu} />
        <AddButton title="할인" handleClick={openDiscountMenu} />
      </div>
    </div>
  );
};
