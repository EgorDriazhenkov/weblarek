import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export class Card<T> extends Component<T> {
  protected idElement!: string;
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor (container: HTMLElement) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
    this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
  }

  set id(value: string) {
    this.idElement = value
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set price(value: number | null) {
    if (value === null) {
      this.priceElement.textContent = "Бесценно";
    } else {
      this.priceElement.textContent = `${value} синапсов`
    }

  }
}