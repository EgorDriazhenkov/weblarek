import { IProduct } from "../../types";
import { ensureElement } from '../../utils/utils';
import { ICardAction } from "../../types";
import { Card } from "./Card";

export interface ICardBasket extends IProduct {
  basketItemIndex: number;
}

export class CardBasket extends Card<ICardBasket> {

  protected basketItemIndexElement: HTMLElement;
  protected buttonElement: HTMLElement;

  constructor( container: HTMLElement, action?:ICardAction) {
    super(container);

    this.basketItemIndexElement = ensureElement<HTMLImageElement>('.basket__item-index', this.container);
    this.buttonElement = ensureElement<HTMLImageElement>('.basket__item-delete', this.container);

    if (action?.onClick) {
      this.buttonElement.addEventListener('click', action.onClick)
    }
  }

  set basketItemIndex(value:number) {
    this.basketItemIndexElement.textContent = String(value);
  }
}