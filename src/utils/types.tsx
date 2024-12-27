export interface ItemConstructor {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uniqueId?: string;
}

export interface OrderFeed {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export type TOrder = {
  readonly ingredients: string[];
  readonly _id: string;
  readonly name: string;
  readonly status: string;
  readonly number: number;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export interface DraggedItem extends ItemConstructor {
  index?: number;
}

export type TFResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};
