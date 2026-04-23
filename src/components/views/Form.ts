import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

interface IOrderForm {
  valid: boolean;
  error?: string | undefined;
}

export class Form extends Component<IOrderForm> {
  protected submitButtonElement: HTMLButtonElement;
  protected errorElement: HTMLElement;
  protected formName: string | null;

  constructor(protected events:IEvents, container: HTMLElement) {
    super(container);

    this.submitButtonElement = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
    this.errorElement = ensureElement<HTMLElement>('.form__errors', this.container);
    this.formName = this.container.getAttribute('name')

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.events.emit(`form:${this.formName}Submit`);
    });   
    
    this.container.addEventListener('input', (e: Event) => {
      const input = e.target as HTMLInputElement;
      this.events.emit('form:change',{ field: input.name, value: input.value });     
    });

  } 

  set valid(value: boolean) {
    this.submitButtonElement.disabled = !value;
  }

  set error(value: string | undefined) {
    if (value) {
    this.errorElement.textContent = value;
    } else {
    this.errorElement.textContent = "";
  }
  }
}
