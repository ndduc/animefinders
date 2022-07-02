import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, state, animate, style, AnimationEvent, AUTO_STYLE } from '@angular/animations';
import { AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

const DEFAULT_DURATION = 1200;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ],
})
export class AboutComponent implements OnInit, AfterViewInit {
  isLoading = true;
  isOpen = true;
  isDisabled = false;
  isCollapse = true;

  numberOfGrid: number = 8;
  constructor( private breakpointObserver: BreakpointObserver) { }

  ngAfterViewInit(): void {
    this.isCollapse = false;
  }

  ngOnInit(): void {
    this.breakpointEvent();
    this.isLoading = false
  }

  breakpointEvent(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XLarge]) {
        this.numberOfGrid = 8;
      } else if (result.breakpoints[Breakpoints.Large]) {
        this.numberOfGrid = 8;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.numberOfGrid = 4;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.numberOfGrid = 4;
      } else {
        this.numberOfGrid = 4;
      }
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}
  




