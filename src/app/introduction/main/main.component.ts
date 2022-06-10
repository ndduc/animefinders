import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  public animationsDisabled = false;

  constructor(private scroller: ViewportScroller, private router: Router, private sanitizer:DomSanitizer) {}
  
  ngOnInit() {
    // this.router.navigate(["/"]);
  }


  
  toggleAnimations() {
    this.animationsDisabled = !this.animationsDisabled;
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

}
