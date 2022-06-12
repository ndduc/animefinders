import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-intro-navigator',
  templateUrl: './intro-navigator.component.html',
  styleUrls: ['./intro-navigator.component.css']
})
export class IntroNavigatorComponent implements OnInit {

  constructor(private scroller: ViewportScroller, private router: Router, private sanitizer:DomSanitizer) {}

  ngOnInit(): void {
  }

  navigaterToPage(path: string): void {
    this.router.navigate([path]);
  }

  async navigaterToPageThenReload(path: string): Promise<void> {
    // await delay(50000);s
    this.router.navigate([path])
    .then(async () => {
      window.location.reload();
    });
  }

}
