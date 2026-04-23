import { categoryMap } from "../../utils/constants";
import { ensureElement } from '../../utils/utils';
import { IProduct } from "../../types";
import { Card } from "./Card";
import { ICardAction } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { CategoryKey } from "../../types";

type TCardCatalog = Pick<IProduct, 'image' | 'category'>;

export class CardCatalog extends Card<TCardCatalog> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container: HTMLElement, action?:ICardAction ) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);

    if (action?.onClick) {
      this.container.addEventListener('click', action.onClick)
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
}