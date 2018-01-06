import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SwipeModule } from './swipe/swipe.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SwipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
