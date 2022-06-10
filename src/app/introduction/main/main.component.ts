import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { AfterViewInit } from '@angular/core';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  public animationsDisabled = false;

  constructor(private scroller: ViewportScroller, private router: Router, private sanitizer:DomSanitizer) {

  }
  
  ngOnInit() {
  }


  navigaterToPageThenReload(path: string): void {
    this.router.navigate([path])
    .then(async () => {
      await delay(1000);
      window.location.reload();
    });
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
