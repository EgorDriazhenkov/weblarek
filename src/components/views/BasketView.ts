import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

interface IBasketView {
  basketList: HTMLElement[];
  totalPrice: number;
  valid: boolean;
}

export class BasketView extends Component<IBasketView> {

  protected basketListElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  protected totalPriceElement: HTMLElement;

  constructor(protected events:IEvents, container: HTMLElement) {
    super(container);

    this.basketListElement = ensureElement<HTMLElement>('.basket__list', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.totalPriceElement = ensureElement<HTMLElement>('.basket__price', this.container);

    this.buttonElement.addEventListener('click', () => {
      this.events.emit('basket:order')
    })

    this.buttonElement.disabled = true;
  }

  set basketList(items:HTMLElement[]) {
    this.basketListElement.innerHTML = ""
    items.forEach((item) => {
      this.basketListElement.appendChild(item)
    })
  } 

  set totalPrice(value: number) {
    this.totalPriceElement.textContent = `${value} синапсов`;
  }

  set valid(value: boolean) {
    this.buttonElement.disabled = !value;
  }
}