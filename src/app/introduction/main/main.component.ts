import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Router } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  my_name: string = "Duke Ng";
  my_title: string = "(Weeboo Lord)"

  isHome: boolean = true;
  isAbout: boolean = false;
  isProject: boolean = false;

  constructor(private scroller: ViewportScroller, private router: Router, private sanitizer:DomSanitizer) {}
  
  ngOnInit() {
    // this.router.navigate(["/"]);
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

  clickEvent(clickEvent: string) {
    switch(clickEvent) {
      case "HOME":
        /// General Intro
        this.isHome = true;
        this.isAbout = false;
        this.isProject = false;
        break;
      case "ABOUT":
        /// Show detail skills
        this.isHome = false;
        this.isAbout = true;
        this.isProject = false;
        break;
      case "PROJECT":
        /// Show all past project
        this.isHome = false;
        this.isAbout = false;
        this.isProject = true;
        break;
      default:
        /// this bound back to Home
        this.isHome = true;
        this.isAbout = false;
        this.isProject = false;
        break;
    }

  }
}
