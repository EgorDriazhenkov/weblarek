import { categoryMap } from "../../utils/constants";
import { ensureElement } from '../../utils/utils';
import { IProduct } from "../../types";
import { Card } from "./Card";
import { CDN_URL } from "../../utils/constants";
import { CategoryKey } from "../../types";
import { IEvents } from '../base/Events';

interface ICardPreview extends IProduct {
  category: string;
  image: string;
  decription: string;
  textButton: string;
  availability: boolean;

}

export class CardPreview extends Card<ICardPreview> {

  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(protected events:IEvents, container: HTMLElement) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);

    this.buttonElement.addEventListener('click', () => {
      this.events.emit('selectedCardButton:click', {id:this.idElement})
    })
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

  set textButton(value: string) {
    this.buttonElement.textContent = value;
  }

  set availability(value: boolean) {
    this.buttonElement.disabled = !value;
  }

}
