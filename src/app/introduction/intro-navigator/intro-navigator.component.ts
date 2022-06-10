import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-intro-navigator',
  templateUrl: './intro-navigator.component.html',
  styleUrls: ['./intro-navigator.component.css']
})
export class IntroNavigatorComponent implements OnInit {

  constructor(private scroller: ViewportScroller, private router: Router, private sanitizer:DomSanitizer) {}

  ngOnInit(): void {
  }

}
