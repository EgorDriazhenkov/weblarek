import { IEvents } from '../base/Events';
import { Form } from "./Form";

export class ContactForm extends Form {

  constructor(protected events:IEvents, container: HTMLElement) {
    super(events, container);
  }
}