import { PlusCircle } from "@phosphor-icons/react";

interface AddButtonProps {
  title: string;
  handleClick?: () => void;
}
export const AddButton = ({ title, handleClick }: AddButtonProps) => {
  return (
    <button
      className="flex items-center justify-center bg-gray-100 text-cyan-600 rounded-lg gap-1 p-3 w-full"
      onClick={handleClick}
    >
      <PlusCircle size={24} weight="fill" className="text-gray-400" />
      {title}
    </button>
  );
};
