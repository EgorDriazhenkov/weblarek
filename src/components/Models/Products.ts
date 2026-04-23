import { IProduct } from "../../types/index.ts"
import { IEvents } from '../base/Events';

export class Products {
  private _items: IProduct[] = [];
  private _selectedProduct: IProduct | undefined;

  constructor(protected events:IEvents) {
    this.events = events;
  }
  

  setProducts (items:IProduct[]) {
    this._items = items;
    this.events.emit('product:change')
  }

  getProducts () {
    return this._items;
  }

  getProductById (itemId:string): IProduct | undefined {
  return this._items.find((item: IProduct):boolean => {
    return item.id === itemId
  });
 }

  setSelectedPoduct(itemId:string) {
    this._selectedProduct = this.getProductById(itemId)
  }

  getSelectedPoduct() {
    return this._selectedProduct
  }
}

