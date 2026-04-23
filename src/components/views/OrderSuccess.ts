import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

interface IOrderSuccess {
  total: number
}

export class OrderSuccess extends Component<IOrderSuccess> {
  protected totalPriceElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

    constructor(protected events:IEvents, container: HTMLElement) {
    super(container);

    this.totalPriceElement = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

    this.buttonElement.addEventListener('click', () => {
      this.events.emit('modal:close')
    })
  }

  set total(value: number) {
    this.totalPriceElement.textContent = `Списано ${value} синапсов`
  }
}