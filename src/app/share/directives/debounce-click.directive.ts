import { Subject } from 'rxjs/Subject';
import { Directive, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import { Subscription } from 'rxjs/Subscription';


/**
 * 点击防抖
 * example:
 * <button appDebounceClick (debounceClick)="log($event)" [debounceTime]="300">
 *  Debounced Click
 * </button>
 *
 * @export
 * @class DebounceClickDirective
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Directive({
  selector: '[appDebounceClick]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {

  @Input() debounceTime = 500;
  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject<any>();
  private subscription: Subscription;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  ngOnInit(): void {
    this.subscription = this.clicks.debounceTime(this.debounceTime).subscribe(e => {
      this.debounceClick.emit(e);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  constructor() { }

}
