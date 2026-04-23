import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { Form } from "./Form";


export class OrderForm extends Form {
  protected cashButtonElement: HTMLButtonElement;
  protected cardButtonElement: HTMLButtonElement;

  constructor(protected events:IEvents, container: HTMLElement) {
    super(events, container);

    this.cashButtonElement = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.cardButtonElement = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);

    this.cardButtonElement.addEventListener('click', () => {
      this.cardButtonElement.classList.add('button_alt-active')
      this.cashButtonElement.classList.remove('button_alt-active')
      this.events.emit('form:onlineButtonSelected')
    })

    this.cashButtonElement.addEventListener('click', () => {
      this.cashButtonElement.classList.add('button_alt-active')
      this.cardButtonElement.classList.remove('button_alt-active')
      this.events.emit('form:cardButtonSelected')
    })
  }
}