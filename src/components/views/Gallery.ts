import { Component } from '../base/Component';

interface IGallery {
  catalog: HTMLElement[] | null[]
}

export class Gallery extends Component<IGallery> {
  protected catalogElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.catalogElement = container;
  }

  set catalog(items:HTMLElement[]) {
    items.forEach((item) => {
      this.catalogElement.appendChild(item)
    })
  }
}