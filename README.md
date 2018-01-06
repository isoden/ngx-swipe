# ngx-swipe

An Angular module to add directive that emit swipe event as `Output`.

## Installation

```console
npm install @isoden/ngx-swipe
```

## Usage

1. Import `SwipeModule`

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SwipeModule } from '@isoden/ngx-swipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SwipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

2. Use directive

```html
<div
  (ngxSwipeX)="onSwipeX($event)"
  (ngxSwipeY)="onSwipeY($event)"
></div>
```

## Limitation

ngx-swipe uses [PointerEvent](https://developer.mozilla.org/ja/docs/Web/API/PointerEvent).  
please use polyfill (e.g. [PEP](https://github.com/jquery/PEP)) if you need.  
[Pointer events - caniuse](https://caniuse.com/#feat=pointer)

## License

[MIT License](https://isoden.mit-license.org)
