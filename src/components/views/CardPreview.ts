import { categoryMap } from "../../utils/constants";
import { ensureElement } from '../../utils/utils';
import { IProduct } from "../../types";
import { Card } from "./Card";
import { ICardAction } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { CategoryKey } from "../../types";

interface ICardPreview extends IProduct {
  inBasket: boolean;
}

export class CardPreview extends Card<ICardPreview> {

  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, action?:ICardAction) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);
    this.inBasket = false

    if (action?.onClick) {
      this.buttonElement.addEventListener('click', () => {
        action.onClick()
      })
    }
   }
  
  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(categoryMap[key as CategoryKey], key === value);
    }
  }

  set image(value: string) {
    this.setImage(this.imageElement, CDN_URL + value, this.title);
  }

  set decription(value: string) {
    this.descriptionElement.textContent = value;
  }

  set inBasket(value: boolean) {
    if (value) {
      this.buttonElement.textContent = 'Удалить из корзины';
  
    } else {
      this.buttonElement.textContent = 'В корзину';
    }
  }

}
