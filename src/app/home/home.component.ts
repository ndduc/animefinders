import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Router } from "@angular/router";
import { SideBarState } from './side-bar-state.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home.component.css'],
})

export class HomeComponent implements OnInit {
  sideState = SideBarState;
  _sideState = SideBarState.INTRO;
  my_name: string = "Duke Ng";
  my_title: string = "(Weeboo Lord)"

  constructor(private scroller: ViewportScroller, private router: Router, private sanitizer:DomSanitizer) {}
  
  ngOnInit() {
    // this.router.navigate(["/"]);
  }

  sideBarClick(state: SideBarState) {
    this._sideState = state;
  } 

  goDown(id) {
    this.scroller.scrollToAnchor(id);
  }

  goDown2() {
    this.scroller.scrollToAnchor("targetGreen");
  }

  goDown3() {
    this.router.navigate([], { fragment: "targetGreen" });
  }

  processResume() {
    var mag = "http://localhost:4200/assets/images/sushi.jpg" ;//magnet.replace('&', '&amp;');
    return this.sanitizer.bypassSecurityTrustUrl (mag);
    //return this.transform(mag);
  }
}
