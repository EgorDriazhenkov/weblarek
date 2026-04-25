import { categoryMap } from "../utils/constants";

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TPayment = 'online' | 'card' | null;


export type CategoryKey = keyof typeof categoryMap;

export interface IAnswerSer {
  id: string;
  total: number;
}

export interface IApi {

  get<T extends object>(uri: string): Promise<T>;

  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
} 

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
} 

export interface IProductsResponse {
  total: number; 
  items: IProduct[];
}


export interface IOrder extends IBuyer { 
  total: number;
  items: string[];
}

export interface ICardAction {
  onClick: () => void;
}

export interface IForm {
  valid: boolean;
  error?: string | undefined;
}