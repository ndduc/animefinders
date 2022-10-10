import { Component, OnInit, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter();

  constructor() { }
  
  onToggleClose() {
    this.closeSideNav.emit();
  }

  ngOnInit() {
  }
}
