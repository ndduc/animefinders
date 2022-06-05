import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

import { slideInAnimation } from 'src/app/animation/slice-animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'ani-hook';

  /// Transition Animation
  prepareRoute(outlet: RouterOutlet) {
    console.log("TEST");
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
