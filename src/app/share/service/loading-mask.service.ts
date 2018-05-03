import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class LoadingMaskService {
  private _selector: string = 'loading_mask_layer';
  private _element: HTMLElement;
  change: EventEmitter<any>;
  changeTime: EventEmitter<any>;

  constructor() {
    this._element = document.getElementById(this._selector);
    this.change = new EventEmitter();
    this.changeTime = new EventEmitter();
  }

  public show(): void {
    this._element.style['display'] = 'block';
  }

  public hide(delay: number = 0): void {
    setTimeout(() => {
      this._element.style['display'] = 'none';
    }, delay);
  }
}
