import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { GogoAnimeSearchModel } from 'src/app/config/gogoanime/model/gogoanime-search.model';

@Component({
  selector: 'app-anime-stream-holder',
  templateUrl: './anime-stream-holder.component.html',
  styleUrls: ['./anime-stream-holder.component.css']
})
export class AnimeStreamHolderComponent implements OnInit {
  @Input() gogoObjects: GogoAnimeSearchModel[] | undefined;
  @Input() objectSource: string | undefined;
  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }
  isLoading: boolean = true;
  isFound: boolean = false;
  isMobile: boolean = false;

  ngOnInit(): void {
    this.isLoading = false;
    this.isFound = true;
    console.log(this.gogoObjects);
    this.breakpointObserverEvent();
  }

  breakpointObserverEvent() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XLarge]) {
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Large]) {
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.isMobile = true;
      } else {
        this.isMobile = true;
      }
    });
  }

  public streamSearch() {

  }


}
