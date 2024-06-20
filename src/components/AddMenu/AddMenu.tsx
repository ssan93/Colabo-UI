import { useContext, useState } from "react";
import { CheckFat } from "@phosphor-icons/react";
import { IDiscount, IItem } from "interface";
import { CurrencyContext } from "contexts";
import { isItem } from "services";
import { ModalHeader } from "components";

interface AddMenuProps {
  title: string;
  objects: ReadonlyArray<IItem | IDiscount>;
  list: ReadonlyArray<IItem | IDiscount>;
  addObjects: (objects: ReadonlyArray<IItem | IDiscount>) => void;
  closeMenu: () => void;
}
export const AddMenu = ({
  title,
  objects,
  list,
  addObjects,
  closeMenu,
}: AddMenuProps) => {
  const currency = useContext(CurrencyContext);
  const [selectedObjects, setSelectedObjects] = useState<
    ReadonlyArray<IItem | IDiscount>
  >([]);

  const handleClickObject = (obj: IItem | IDiscount) => {
    if (selectedObjects.includes(obj)) {
      setSelectedObjects(selectedObjects.filter((object) => object !== obj));
    } else {
      setSelectedObjects([...selectedObjects, obj]);
    }
  };

  const handleSubmit = () => {
    closeMenu();
    addObjects(selectedObjects);
  };

  return (
    <div className="absolute top-0 w-full h-full z-52 bg-white overflow-scroll flex">
      <div className="flex flex-col w-full h-full">
        <ModalHeader closeModal={closeMenu}>
          <p className="text-xl font-semibold">{title}메뉴</p>
        </ModalHeader>
        <div className="flex flex-col grow gap-4 pl-12 pr-8 py-8">
          {list.map((obj) => {
            return (
              <div
                key={obj.id}
                onClick={() =>
                  !objects.find((o) => o.name === obj.name) &&
                  handleClickObject(obj)
                }
                className="flex justify-between gap-4"
              >
                <div className="w-full">
                  <p className="font-semibold line-clamp-2">{obj.name}</p>
                  {isItem(obj) ? (
                    <p className="text-cyan-600 text-sm">
                      {`${obj.price.toLocaleString("en-US")}${currency}`}
                    </p>
                  ) : (
                    <p className="text-cyan-600 text-sm">{`${
                      obj.rate * 100
                    }%`}</p>
                  )}
                </div>
                {objects.find((o) => o.name === obj.name) && (
                  <div className="flex items-center text-gray-300 w-6">
                    <CheckFat size={24} weight="fill" />
                  </div>
                )}
                {selectedObjects.includes(obj) && (
                  <div className="flex items-center text-cyan-600 w-6">
                    <CheckFat size={24} weight="fill" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="sticky w-full max-w-screen-sm h-44 bottom-0 border-t-2 px-4 py-6 flex flex-col items-center bg-blue-600">
          <p className="text-lg text-white">
            {title === "시술" ? "서비스" : "할인"}를 선택하세요(여러 게
            선택가능)
          </p>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-400 text-white text-lg rounded-lg p-4 my-6"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};
