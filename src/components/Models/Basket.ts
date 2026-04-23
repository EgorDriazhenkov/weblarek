import { IProduct } from "../../types/index.ts" 
import { IEvents } from '../base/Events';

export class Basket {
  private _items: IProduct[] = [];

  constructor(protected events:IEvents) {
    this.events = events;
  }

  get items() {
    return this._items;
  }

  addItem(item:IProduct) {
    this._items.push(item);
    this.events.emit('backet:change');
  }

  removeItem(item:IProduct) {
    this._items = this._items.filter((product) => {
      return product.id !== item.id;
    })
    this.events.emit('backet:change');
  }

  clearBusket() {
    this._items = [];
    this.events.emit('backet:change');
  }

  getProductsPrice() {
    return this._items.reduce((acc, item) => {
      if(item.price === null){
        return acc
      } else {
        return acc += item.price;
      }
    }, 0)
  }

  getProductsQuantity() {
    return this._items.length;
  }

  checkProductInBasket(IdItem: string) {
    return this._items.some(item => item.id === IdItem)
  }
}
