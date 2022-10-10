import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter();

  constructor(
    private router: Router
    ) {

  }
  
  onToggleClose() {
    this.closeSideNav.emit();
  }

  ngOnInit() {
  }

  public navigateToComponent(path: string) {
    this.router.navigateByUrl(path);
  }

}
