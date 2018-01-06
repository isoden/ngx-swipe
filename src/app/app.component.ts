import { Component } from '@angular/core';

@Component({
  selector: 'ngx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx';

  onSwipeY(amount: number) {
    console.log('[onSwipeY] swiped', amount);
  }

  onSwipeX(amount: number) {
    console.log('[onSwipeX] swiped', amount);
  }
}
