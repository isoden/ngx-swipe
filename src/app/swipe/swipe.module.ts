/**
 * @isoden/ngx-swipe - An Angular module to add directive that emit swipe event as `Output`.
 *
 * https://github.com/isoden/ngx-swipe
 *
 * Copyright (c) 2018 Yu Isoda
 * Licensed under the MIT license. https://isoden.mit-license.org
 */

import { NgModule } from '@angular/core';

import { SwipeDirective } from './swipe.directive';

@NgModule({
  declarations: [
    SwipeDirective,
  ],
  exports     : [
    SwipeDirective,
  ],
})
export class SwipeModule { }
