import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { Form } from "./Form";
import { IForm } from '../../types';

interface IContactForm extends IForm {
  email: string;
  phone: string;
}

export class ContactForm extends Form<IContactForm> {

  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(protected events:IEvents, container: HTMLElement) {
    super(events, container);

    this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container)
    this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container)
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}