import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, state, animate, style, AnimationEvent, AUTO_STYLE } from '@angular/animations';
import { AfterViewInit } from '@angular/core';

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
  isOpen = true;
  isDisabled = false;
  isCollapse = true;

  constructor() { }

  ngAfterViewInit(): void {
    this.isCollapse = false;
  }

  ngOnInit(): void {
  }
  



}
