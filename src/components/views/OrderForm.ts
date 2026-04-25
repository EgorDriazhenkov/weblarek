import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { Form } from "./Form";
import { IForm } from '../../types';
import { TPayment } from '../../types';

interface IOrderForm extends IForm {
  payment: TPayment;
  address: string;
}

export class OrderForm extends Form<IOrderForm> {

  protected addressInput: HTMLInputElement;
  protected cashButtonElement: HTMLButtonElement;
  protected cardButtonElement: HTMLButtonElement;

  constructor(protected events:IEvents, container: HTMLElement) {
    super(events, container);

    this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
    this.cashButtonElement = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.cardButtonElement = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);

    this.cardButtonElement.addEventListener('click', () => {
      this.events.emit('form:onlineButtonSelected')
    })

    this.cashButtonElement.addEventListener('click', () => {
      this.events.emit('form:cardButtonSelected')
    })
  }

  set payment(value: TPayment) {
    switch (value) {

      case 'online': 
      this.cardButtonElement.classList.add('button_alt-active')
      this.cashButtonElement.classList.remove('button_alt-active')
      break

      case 'card': 
      this.cashButtonElement.classList.add('button_alt-active')
      this.cardButtonElement.classList.remove('button_alt-active')
      break

      default: 
      this.cashButtonElement.classList.remove('button_alt-active')
      this.cardButtonElement.classList.remove('button_alt-active')
      break
    }
  }

  set address(value:string) {
    this.addressInput.value = value;
  }


}