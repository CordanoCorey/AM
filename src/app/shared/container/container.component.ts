import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { windowHeightSelector, windowWidthSelector, SmartComponent } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'am-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent extends SmartComponent implements OnInit {

  windowHeight = 0;
  windowHeight$: Observable<number>;
  windowWidth = 0;
  windowWidth$: Observable<number>;

  constructor(
    public store: Store<any>,
    private elementRef: ElementRef) {
    super(store);
    this.windowHeight$ = windowHeightSelector(store);
    this.windowWidth$ = windowWidthSelector(store);
  }

  get canAnalyze(): boolean {
    return true;
  }

  get canExport(): boolean {
    return false;
  }

  get containerWidth(): number {
    return this.windowWidth - 160;
  }

  get windowHeightChanges(): Subscription {
    return this.windowHeight$.subscribe(x => {
      this.windowHeight = x;
      if (x !== 0) {
        this.resetWindowHeight();
      }
    });
  }

  get windowWidthChanges(): Subscription {
    return this.windowWidth$.subscribe(x => {
      this.windowWidth = x;
      if (x !== 0) {
        this.resetWindowWidth();
      }
    });
  }

  ngOnInit() {
    this.subscribe([
      this.windowHeightChanges,
      this.windowWidthChanges,
    ]);
  }

  resetWindowHeight() {
    if (this.elementRef && this.elementRef.nativeElement) {
      this.elementRef.nativeElement.style.height = `${this.windowHeight}px`;
    }
  }

  resetWindowWidth() {
    if (this.elementRef && this.elementRef.nativeElement) {
      this.elementRef.nativeElement.style.width = `${this.windowWidth}px`;
    }
  }

}
