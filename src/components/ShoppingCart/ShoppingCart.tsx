import { useState } from "react";
import { AddMenu, CartFooter, CartHeader, CartList } from "components";
import { IDiscount, IItem } from "interface";
import { useFetchCalculator } from "services";
import { CurrencyContext } from "contexts";

interface ShoppingCartProps {
  name: string;
  date: string;
  setOpen: (value: boolean) => void;
}

export const ShoppingCart = ({ name, date, setOpen }: ShoppingCartProps) => {
  const [openMenu, setOpenMenu] = useState("");
  const [items, setItems] = useState<ReadonlyArray<IItem>>([]);
  const [discounts, setDiscounts] = useState<ReadonlyArray<IDiscount>>([]);

  const { data, isLoading, error } = useFetchCalculator();

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>Error...</div>;

  const currency = data.currency_code === "KRW" ? "원" : "$";

  const openServiceMenu = () => {
    setOpenMenu("service");
  };

  const openDiscountMenu = () => {
    setOpenMenu("discount");
  };

  const addItem = (newItems: ReadonlyArray<IItem>) => {
    setItems([...items, ...newItems]);
  };

  const addDiscount = (newDiscounts: ReadonlyArray<IDiscount>) => {
    const newDiscountsWithItems = newDiscounts.map((discount) => ({
      ...discount,
      itemsId: items.map((item) => item.id),
    }));
    setDiscounts([...discounts, ...newDiscountsWithItems]);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    setDiscounts(
      discounts.map((discount) => ({
        ...discount,
        itemsId: discount.itemsId!.filter((itemId) => itemId !== id),
      }))
    );
  };

  const deleteDiscount = (id: string) => {
    setDiscounts(discounts.filter((discount) => discount.id !== id));
  };

  const handleItemChange = (id: string, count: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, count } : item)));
  };

  const handleDiscountChange = (id: string, itemsId: ReadonlyArray<string>) => {
    setDiscounts(
      discounts.map((discount) =>
        discount.id === id ? { ...discount, itemsId } : discount
      )
    );
  };

  return (
    <CurrencyContext.Provider value={currency}>
      <div className="w-full h-full max-w-screen-sm fixed top-0 z-50 bg-white pb-40">
        <div className="h-full overflow-y-scroll">
          <CartHeader
            name={name}
            date={date}
            closeModal={() => setOpen(false)}
            openServiceMenu={openServiceMenu}
            openDiscountMenu={openDiscountMenu}
          />
          <CartList
            items={items}
            discounts={discounts}
            handleItemChange={handleItemChange}
            handleDiscountChange={handleDiscountChange}
            deleteItem={deleteItem}
            deleteDiscount={deleteDiscount}
          />
        </div>
        <CartFooter items={items} discounts={discounts} />
        {openMenu === "service" && (
          <AddMenu
            title="시술"
            objects={items}
            list={Object.values(data.items)}
            addObjects={(objects: ReadonlyArray<IItem | IDiscount>) =>
              addItem(objects as ReadonlyArray<IItem>)
            }
            closeMenu={() => setOpenMenu("")}
          />
        )}
        {openMenu === "discount" && (
          <AddMenu
            title="할인"
            objects={discounts}
            list={Object.values(data.discounts)}
            addObjects={(objects: ReadonlyArray<IItem | IDiscount>) =>
              addDiscount(objects as ReadonlyArray<IDiscount>)
            }
            closeMenu={() => setOpenMenu("")}
          />
        )}
      </div>
    </CurrencyContext.Provider>
  );
};
