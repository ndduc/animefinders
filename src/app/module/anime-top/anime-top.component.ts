import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimeModalComponent } from '../../dialog/anime/anime-modal/anime-modal.component';
import { QuestionModalComponent } from '../../dialog/question/question/question-modal/question-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AnimeSortModel } from '../../model/anime-sort-model.model';
import { sortOptionEnum } from '../../enum/enum-option/enum-option';
import { AnimePaginationModel } from '../../model/anime-pagination.model';
import { AnimeModel } from '../../model/anime.model';
import { AniTop } from '../../model/animeTop.model';
import { JikanService } from '../../service/jikan/jikan.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-anime-top',
  templateUrl: './anime-top.component.html',
  styleUrls: ['./anime-top.component.css']
})


export class AnimeTopComponent implements OnInit {
  
  aniList: AnimeModel[] = [];
  aniListShow: AnimeModel[] = [];
  isLoading: boolean = true;
  selected = '';
  aniTop: AniTop[] = [];
  aniTopShow: AniTop[] = [];
  error: any;
  headers: string[] = [];
  panelOpenState: boolean = false;
  isTopAnime: boolean = false;
  isAniEmpty : boolean = true;
  isConnectionError: boolean = false;
  screen: number = 0;
  pageSize: any;
  sortOptionObject = [
    {
      name: "Select Sort Option",
      type: "NOTHING"
    } as AnimeSortModel,
    {
      name: "Sort By Rate",
      type: "RATE"
    } as AnimeSortModel,
    {
      name: "Sort By Type",
      type: "TYPE"
    } as AnimeSortModel
  ] as AnimeSortModel[];
  selectedOptionSort = this.sortOptionObject[0];
  sort_type: number = 0;
  sort_rate: number = 0;
  selectedSort: any;
  closeResult = '';
  topAnimeIndex: any;
  
  topAnimeNumberOfColumn: number = 4;
  seasonAnimeNumberOfColumn: number = 4;
  isMobile: boolean = false;

  paginationObject: AnimePaginationModel = {} as AnimePaginationModel ;
  seasonLis: Array<{}> = [];

  public searchForm = new FormGroup({});
  public searchName: string = 'searchName';
  public searchControl = new FormControl(null, Validators.required);

  public searchYearForm = new FormGroup({});
  public searchYearName: string = 'searchYear';
  public searchAdvControl = new FormControl(null, Validators.required);
  public searchSeasonName: string = 'searchSeason';
  public searchSeasonControl = new FormControl(null, Validators.required);
  
  selectedIndex: number = 1;
  strTitle: string = '';
  selectedYear: number = new Date().getFullYear();
  selectedSeason: string = "";
  currentPage: number = 1;
  isSearchByTitleActivated: boolean = false;
  searchTitle: string = "";
  constructor(private jikanService: JikanService, 
    public modelService: NgbModal,
    private breakpointObserver: BreakpointObserver,
    private route:Router 
    ) { 
    }

  ngOnInit(): void {
    this.setSeasonInterval();
    this.getTopAnime(1, '');
    this.setUpForm();
    this.breakpointObserverEvent();
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
        this.topAnimeNumberOfColumn = 4;
        this.seasonAnimeNumberOfColumn = 4;
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Large]) {
        this.topAnimeNumberOfColumn = 4;
        this.seasonAnimeNumberOfColumn = 4;
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.topAnimeNumberOfColumn = 3;
        this.seasonAnimeNumberOfColumn = 3;
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.topAnimeNumberOfColumn = 2;
        this.seasonAnimeNumberOfColumn = 2;
        this.isMobile = true;
      } else {
        this.topAnimeNumberOfColumn = 1;
        this.seasonAnimeNumberOfColumn = 1;
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

  private setUpForm(): void {
    this.searchForm.addControl(this.searchName, this.searchControl);
    this.searchYearForm.addControl(this.searchYearName, this.searchAdvControl);
    this.searchYearForm.addControl(this.searchSeasonName, this.searchSeasonControl);
  }

  public clear() {
    this.error = undefined;
    this.isLoading = true;
    this.headers = [];
    this.isAniEmpty = true;
    this.isConnectionError = false;
  }

  public setRow(index: number) {
    this.selectedIndex = index;
  }

  public getTopAnime(page: number, subtype: string) {

    this.currentPage = 1;
    this.isSearchByTitleActivated = false;
    this.getTopAnimeHelper(page, subtype);
    this.clearSort();
  }

  public getTopAnimeHelper(page: number, subtype: string) {
    this.jikanService.getTopAnime(page, subtype).subscribe(
      x => {
        this.setAniTopList(x.data, x.pagination);
      }
    );
  }

  public getAnimeByTitle(title: string, page:number) {
    this.searchTitle = title;
    this.isSearchByTitleActivated = true;
    this.currentPage = 1;
    this.getAnimeByTitleHelper(title, page);
    this.clearSort();
  }

  public getAnimeByTitleHelper(title: string, page:number) {
    this.jikanService.getAnimeByTitle(title, page).subscribe(
      x => {
        this.setAniList(x.data, x.pagination);
      },
      (error) => {
        this.setAniList(this.aniList, this.paginationObject);
      }
    );
  }


  private setAniList(lst: AnimeModel[], originalList: AnimePaginationModel) {

    if(lst == null || lst.length === 0) {
      this.isConnectionError = false;
      this.isAniEmpty = true;
      this.isLoading = false;
    } else {
      this.isConnectionError = false;
      this.isAniEmpty = false;
      this.aniList = lst;
      this.isLoading = false;

      this.paginationObject = originalList;
      this.aniListShow = this.aniList;
      this.pageSize = this.paginationObject.items.total;  
      this.currentPage = this.paginationObject.current_page;
    }
    this.isTopAnime = true;
  }

  private setAniTopList(lst: AnimeModel[], originalList: AnimePaginationModel) {
    if(lst == null || lst.length === 0) {
      this.isConnectionError = false;
      this.isAniEmpty = true;
      this.isLoading = false;
    } else {
      this.isConnectionError = false;
      this.isAniEmpty = false;
      this.aniList = lst;
      this.isLoading = false;

      this.paginationObject = originalList;
      this.aniListShow = this.aniList;
      this.pageSize = this.paginationObject.items.total;  
      this.currentPage = this.paginationObject.current_page;

      this.aniTopShow = this.aniTop;
    }
    this.isTopAnime = true;
  }



  public openTorrentModal(title, imageSrc, episode, type, animeId, animeObject, isStream) {
    const modalRef = this.modelService.open(AnimeModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.imageSrc = imageSrc;
    modalRef.componentInstance.episode = episode;
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.animeId = animeId;
    modalRef.componentInstance.aniObject = animeObject;
    modalRef.componentInstance.isTopAnime = this.isTopAnime;
    modalRef.componentInstance.isStream = isStream;
    
  }

  public openQAModal() {
    const modalRef = this.modelService.open(QuestionModalComponent);
    modalRef.componentInstance.title = "TEST";
    modalRef.componentInstance.imageSrc = "TEST";
    modalRef.componentInstance.episode = "TEST";
    modalRef.componentInstance.type = "TEST";
    modalRef.componentInstance.animeId = "TEST";

  }

  public checkIsNumber(episode) {
    if(episode > 0) {
      return true;
    } else {
      return false;
    }
  }

  public clearSort() {
    this.sort_type = 0;
    this.sort_rate = 0;
  }

  public onPageChange($event) {
    this.currentPage = $event.pageIndex + 1;
    if (this.isSearchByTitleActivated) {
      this.getAnimeByTitleHelper(this.searchTitle, this.currentPage);
    }
  }

  public topAnimeOnPageChange($event) {
    this.currentPage = $event.pageIndex + 1;
    this.getTopAnimeHelper(this.currentPage, "");
  }

  public convertToTitleCase(value:string): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  }

  public backToTop(event) {
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
  }



}
