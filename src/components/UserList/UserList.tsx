import { useState } from "react";
import { ShoppingCart } from "components";
import { colavoHero } from "images";

export const UserList = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center gap-8">
      <img src={colavoHero} alt="logo" className="w-full max-w-[500px]" />
      <div className="flex justify-center">
        <button
          className="flex items-center justify-center bg-gray-200 rounded-lg p-2"
          onClick={() => setModalOpen(true)}
        >
          결제입력
        </button>
      </div>
      {modalOpen && (
        <ShoppingCart
          name="곽지우"
          date="2019. 6. 14. 오후 5:30"
          setOpen={setModalOpen}
        />
      )}
    </div>
  );
};
