import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-anime-navigation-bar',
  templateUrl: './anime-navigation-bar.component.html',
  styleUrls: ['./anime-navigation-bar.component.css']
})
export class AnimeNavigationBarComponent implements OnInit {

  isConnectionError: boolean = false;
  seasonLis: Array<{}> = [];
  topList: string[] = ['All', 'TV', 'Movie', 'OVA', 'ONA', 'Special', 'Airing'];
  topSelected: string = '';
  selectedSeason: string = "";
  isMobile: boolean = false;
  isLoading: boolean = true;
  selectedIndex: number = -1;
  selectedIndex2nd: number = 0;
  
  public searchForm = new FormGroup({});
  public searchName: string = 'searchName';
  public searchControl = new FormControl(null, Validators.required);
  strTitle: string = '';

  isTopSelected = false;

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

    if(this.selectedIndex == -1) {
      this.isTopSelected = true;
    } else {
      this.isTopSelected = false;
    }
    this.setSeasonInterval();
    this.setUpForm();
    this.breakpointObserverEvent();

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

  public setSeasonInterval() {
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    /**
     * Winter == 1st quarter == JAN to MARCH
     * Spring == 2nd quarter == APR to JUN
     * Summer == 3rd quarter == JUL to SEP
     * Fall == 4th quarter == Oct to Dec
    */
    if(month >= 1 && month <= 3 ) {
      this.setSeasonIntervalHelper("spring", year, "future"); //up coming
      this.setSeasonIntervalHelper("winter", year, "current");
      this.setSeasonIntervalHelper("fall", year-1, "past");
      this.setSeasonIntervalHelper("summer", year-1, "past");
      this.setSeasonIntervalHelper("spring", year-1, "past");
    } else if (month >= 4 && month <= 6) {
      this.setSeasonIntervalHelper("summer", year, "future"); //up coming
      this.setSeasonIntervalHelper("spring", year, "current");
      this.setSeasonIntervalHelper("winter", year, "past");
      this.setSeasonIntervalHelper("fall", year-1, "past");
      this.setSeasonIntervalHelper("summer", year-1, "past");
    } else if (month >= 7 && month <= 9) {
      this.setSeasonIntervalHelper("fall", year, "future"); //up coming
      this.setSeasonIntervalHelper("summer", year, "current");
      this.setSeasonIntervalHelper("spring", year, "past");
      this.setSeasonIntervalHelper("winter", year, "past");
      this.setSeasonIntervalHelper("fall", year-1, "past");
    } else {
      this.setSeasonIntervalHelper("winter", year+1, "future"); //up coming
      this.setSeasonIntervalHelper("fall", year, "current");
      this.setSeasonIntervalHelper("summer", year, "past");
      this.setSeasonIntervalHelper("spring", year, "past");
      this.setSeasonIntervalHelper("winter", year, "past");
    }

    this.seasonLis.find(x => {
      if (x["opt"] == "current") {
        this.selectedSeason = x["season"];
      }
    })

  }

  private setSeasonIntervalHelper(season, year, opt) {
    //var tmpMap: Map<string, number> = new Map<string, number>();
    var tmpMap = {};
    tmpMap["season"] = season;
    tmpMap["year"] = year;
    tmpMap["opt"] = opt;
    this.seasonLis.push(tmpMap);
  }

  public setRow2nd(index: number, path: string) {
    this.selectedIndex2nd = index;
    if (path === '/anime/top') {

      var filtered = this.topList[this.selectedIndex2nd].toLocaleLowerCase();
      if (filtered === "tv" || filtered === "movie" || filtered === "ova" || filtered === "special" || filtered === "ona" ) {
        path = path + "/type/" + filtered; 
      } else {
        path = path + "/filter/" + filtered;
      }

    }
    this.navigateToComponent(path, this.selectedIndex);

  }

  public setRow(index: number, path: string) {
    this.selectedIndex = index;
    if (path === '/anime/season') {
      let selectedSeason = this.seasonLis[this.selectedIndex];
      path = path + "/" + this.selectedIndex + "/" + selectedSeason['season'] + "/" + selectedSeason['year']
    } else if (path === '/anime/search') {
      path = path + "/" + this.strTitle;
    } else if (path === '/anime/top') {
      path = path + "/type/" + "all"
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

}
