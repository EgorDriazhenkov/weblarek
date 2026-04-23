import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

interface IModal {
  content: HTMLElement | null ;
  display: boolean;
}

export class Modal extends Component<IModal> {
  protected contentElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(protected events:IEvents, container: HTMLElement) {
    super(container);

    this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.modal__close', this.container);

    this.buttonElement.addEventListener('click', () => {
      this.events.emit('modal:close')
    })
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        this.events.emit('modal:close')
      }
    })

    this.container.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
        this.events.emit('modal:close');
      }
    });
  }

  set content(value: HTMLElement) {
      this.contentElement.innerHTML = ""
      this.contentElement.appendChild(value);
  }

  set display(value:boolean) {
    if (value) {
      this.container.classList.add("modal_active")
    } else {
      this.container.classList.remove("modal_active")
    }
  }
}