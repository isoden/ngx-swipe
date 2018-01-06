import {
  Directive,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { skipUntil } from 'rxjs/operators/skipUntil';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { scan } from 'rxjs/operators/scan';
import { share } from 'rxjs/operators/share';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

interface Vector {
  x: number;
  y: number;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngxSwipeX], [ngxSwipeY]'
})
export class SwipeDirective implements OnInit, OnDestroy {
  @Output()
  ngxSwipeX = new EventEmitter<number>();

  @Output()
  ngxSwipeY = new EventEmitter<number>();

  private onDestroy$ = new Subject<void>();

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer2: Renderer2,
  ) {
  }

  ngOnInit() {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'touch-action', 'none');

    const pointerdown$ = this.listen<PointerEvent>('pointerdown')
      .pipe(
        mergeMap(origin => {
          const seed = {
            origin: {
              x: origin.pageX,
              y: origin.pageY,
            },
            current: {
              x: origin.pageX,
              y: origin.pageY
            }
          };

          return this.listen<PointerEvent>('pointermove')
            .pipe(
              map(event => ({ x: event.pageX, y: event.pageY })),
              scan<Vector, { origin: Vector, current: Vector }>((memo, value) => {
                return {
                  ...memo,
                  current: {
                    x: value.x - memo.origin.x,
                    y: value.y - memo.origin.y,
                  }
                };
              }, seed),
              takeUntil(this.listen<PointerEvent>('pointerup')),
            );
        }),
        takeUntil(this.onDestroy$),
        share(),
      );

      pointerdown$
        .pipe(
          map(coordinate => coordinate.current.x),
          distinctUntilChanged()
        )
        .subscribe(this.ngxSwipeX);

      pointerdown$
        .pipe(
          map(coordinate => coordinate.current.y),
          distinctUntilChanged()
        )
        .subscribe(this.ngxSwipeY);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private listen<T extends Event>(eventName: string) {
    return new Observable<T>(observer => {
      return this.renderer2.listen(this.elementRef.nativeElement, eventName, event => observer.next(event));
    });
  }
}
