import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-visual-novel-navigation-bar',
  templateUrl: './visual-novel-navigation-bar.component.html',
  styleUrls: ['./visual-novel-navigation-bar.component.css']
})
export class VisualNovelNavigationBarComponent implements OnInit {

  @Output() SideNavToggle = new EventEmitter();  
  
  isConnectionError: boolean = false;
  seasonLis: Array<{}> = [];
  mainList: Array<{}> = [];
  topList: string[] = ['Popularity', 'Rating'];
  topSelected: string = '';
  selectedSeason: string = "";
  isMobile: boolean = false;
  isLoading: boolean = true;
  selectedIndex: number = 0;
  selectedIndex2nd: number = 0;
  
  public searchForm = new FormGroup({});
  public searchName: string = 'searchName';
  public searchControl = new FormControl(null, Validators.required);
  strTitle: string = '';


  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute
    ) { 
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('index')) {
        this.selectedIndex = Number(params.get('index'));
      } else if (params.get('title')) {
        this.selectedIndex = -2;
      }
    });

    this.setMainList();
    this.setUpForm();
    this.breakpointObserverEvent();

  }

  private setMainList(): void {
    this.mainList.push(
      {
        "name" : "Top Visual Novels",
        "path" : "/vn/top"
      },
      {
        "name" : "New Releases",
        "path" : "/vn/release"
      },
      {
        "name" : "Producers",
        "path" : "/vn/producer"
      },
      {
        "name" : "Characters",
        "path" : "/vn/character"
      }
    );
  }

  private setUpForm(): void {
    this.searchForm.addControl(this.searchName, this.searchControl);
  }

  private breakpointObserverEvent() {
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


  public setRow2nd(index: number, path: string) {
    console.log("2nd INDEX  " + index + "; path: " + path);
    this.selectedIndex2nd = index;
    if (path === '/vn/top') {
      var filtered = this.topList[this.selectedIndex2nd].toLocaleLowerCase();
      if (filtered === "popularity" || filtered === "rating") {
        path = path + "/" + filtered; 
      }
    }
    this.navigateToComponent(path, this.selectedIndex);

  }

  public setRow(index: number, path: string) {
    console.log(path);
    this.selectedIndex = index;
    // if (path === '/anime/season') {
    //   let selectedSeason = this.seasonLis[this.selectedIndex];
    //   path = path + "/" + this.selectedIndex + "/" + selectedSeason['season'] + "/" + selectedSeason['year']
    // } else if (path === '/anime/search') {
    //   path = path + "/" + this.strTitle;
    // } else 
    
    if (path === '/vn/top') {
      path = path + "/popularity";
    }
    this.navigateToComponent(path, this.selectedIndex);
  }

  public convertToTitleCase(value:string): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  }

  public navigateToComponent(path: string, selectedIndex: number) {
    this.router.navigateByUrl(path, { state: { index: selectedIndex} });
  }



  openSidenav() {
    this.SideNavToggle.emit();
  }

}
