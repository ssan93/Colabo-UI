interface SelectModalProps {
  children: React.ReactNode;
  title: string;
  closeModal: () => void;
  submitModal: () => void;
}
export const SelectModal = ({
  children,
  title,
  closeModal,
  submitModal,
}: SelectModalProps) => {
  return (
    <>
      {/* No interaction outside of modal */}
      <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50"></div>
      {/* modal */}
      <div className="fixed max-w-[500px] top-10 left-0 right-0 m-auto w-10/12 max-h-[70vh] z-50 bg-white border-2 shadow-lg overflow-y-scroll">
        <div className="p-8">
          <p className="text-lg font-medium">{title}</p>
          {children}
        </div>
        <div className="sticky bottom-0 h-12 bg-white flex text-cyan-800">
          <button className="w-full" onClick={closeModal}>
            삭제
          </button>
          <button className="w-full" onClick={() => submitModal()}>
            화긴
          </button>
        </div>
      </div>
    </>
  );
};
