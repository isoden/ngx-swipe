import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { cold, hot } from 'jasmine-marbles';
import { SwipeModule } from './swipe.module';

@Component({
  template: `<div (ngxSwipeX)="swipeX.next($event)" (ngxSwipeY)="swipeY.next($event)"></div>`,
})
class TestComponent {
  swipeX = new ReplaySubject<number>();
  swipeY = new ReplaySubject<number>();
  swipeX$ = this.swipeX.asObservable();
  swipeY$ = this.swipeY.asObservable();
}

const simulateContinualPointerEvent = (fixture: ComponentFixture<TestComponent>, events: Partial<PointerEvent>[]) => {
  const eventNames = ['pointerdown', ...Array.from(Array(events.length - 2), () => 'pointermove'), 'pointerup'];
  const debugEl = fixture.debugElement.query(By.css('div'));

  events.forEach((event, i) => debugEl.triggerEventHandler(eventNames[i], event));
};

describe('SwipeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports     : [SwipeModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSwipeX event', () => {
    const expected$ = cold('(abcde)', { a: 2, b: 4, c: 6, d: 4, e: 2 });

    simulateContinualPointerEvent(fixture, [
      { pageX: 10, pageY: 0 },
      { pageX: 12, pageY: 0 },
      { pageX: 14, pageY: 0 },
      { pageX: 16, pageY: 0 },
      { pageX: 16, pageY: 0 },
      { pageX: 14, pageY: 0 },
      { pageX: 12, pageY: 0 },
      { pageX: 16, pageY: 0 },
    ]);

    expect(component.swipeX$).toBeObservable(expected$);
  });

  it('should emit onSwipeY event', () => {
    const expected$ = cold('(abcde)', { a: 2, b: 4, c: 6, d: 4, e: 2 });

    simulateContinualPointerEvent(fixture, [
      { pageX: 0, pageY: 10 },
      { pageX: 0, pageY: 12 },
      { pageX: 0, pageY: 14 },
      { pageX: 0, pageY: 16 },
      { pageX: 0, pageY: 16 },
      { pageX: 0, pageY: 14 },
      { pageX: 0, pageY: 12 },
      { pageX: 0, pageY: 16 },
    ]);

    expect(component.swipeY).toBeObservable(expected$);
  });
});
