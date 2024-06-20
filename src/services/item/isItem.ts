import { IDiscount, IItem } from "interface";

export const isItem = (obj: IItem | IDiscount): obj is IItem => {
  return (obj as IItem).price !== undefined;
};
