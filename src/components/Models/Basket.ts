import { IProduct } from "../../types/index.ts" 

export class Basket {
  private _items: IProduct[] = [];

  get items() {
    return this._items;
  }

  addItem(item:IProduct) {
    this._items.push(item);
  }

  removeItem(item:IProduct) {
    this._items = this._items.filter((product) => {
      return product.id !== item.id;
    })
  }

  clearBusket() {
    this._items = [];
  }

  getProductsPrice() {
    return this._items.reduce((acc, item) => {
      return acc += item.price;
    }, 0)
  }

  getProductsQuantity() {
    return this._items.length;
  }

  checkProductInBasket(IdItem: string) {
    return this._items.some(item => item.id === IdItem)
  }
}
