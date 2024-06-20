interface ModalHeaderProps {
  closeModal: () => void;
  children: React.ReactNode;
}
export const ModalHeader = ({ closeModal, children }: ModalHeaderProps) => {
  return (
    <div className="flex items-center h-16 px-4 pt-12">
      <button className="absolute" onClick={closeModal}>
        <span className="text-gray-300 text-4xl font-bold">×</span>
      </button>
      <div className="flex flex-col items-center w-full">{children}</div>
    </div>
  );
};
