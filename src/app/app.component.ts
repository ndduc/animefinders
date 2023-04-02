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
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  pageTitle: string = "anime";
  constructor() {
  }

  ngOnInit() {
    AOS.init();
  }

  /// Transition Animation
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  eventEventCheckpage($event) {
    this.pageTitle = $event.pageTitle;
    console.log(this.pageTitle);
  }

}
