import { Component, OnInit } from '@angular/core';
import { AniList } from '../config/jikan/animelist';
import { JikanService } from '../config/jikan/jikan.service';
import { ConfigService } from '../config/myaws/config.service';
import { Search } from '../config/myaws/search';
import { NyaaService } from '../config/nyaaaws/nyaa.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AnimeModalComponent } from '../common/modal/anime/anime-modal/anime-modal.component';
import { sortOptionEnum } from '../common/enum/enum-option/enum-option';
import { AniTop } from '../config/jikan/animeTop';
import { QuestionModalComponent } from '../common/modal/question/question-modal/question-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit } from '@angular/core';
import { AnimeSortModel } from './model/anime-sort-model.model';


@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  providers: [NyaaService],
  styleUrls: ['./anime.component.css']
})


export class AnimeComponent implements OnInit {
  
  sortOption = sortOptionEnum;
  isLoading: boolean = true;
  isAdv: boolean = false;
  isFilter: boolean = false;
  strYear: string = '';
  strTitle: string = '';
  isHidden: boolean = true;
  selected = '';
  aniList: AniList[] = [];
  aniListShow: AniList[] = [];
  aniTop: AniTop[] = [];
  aniTopShow: AniTop[] = [];
  searchList: Search[] = [];
  error: any;
  headers: string[] = [];
  seasonLis: Array<{}> = [];
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

  public searchForm = new FormGroup({});
  public searchName: string = 'searchName';
  public searchControl = new FormControl(null, Validators.required);

  public searchYearForm = new FormGroup({});
  public searchYearName: string = 'searchYear';
  public searchAdvControl = new FormControl(null, Validators.required);
  
  constructor(private jikanService: JikanService, 
    public modelService: NgbModal,
    private breakpointObserver: BreakpointObserver) { 
    }

  ngOnInit(): void {
    this.setSeasonInterval();
    this.getSeasonalAnime(null,null);
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
  
  private setUpForm(): void {
    this.searchForm.addControl(this.searchName, this.searchControl);
    this.searchYearForm.addControl(this.searchYearName, this.searchAdvControl);
  }

  public clear() {
    this.error = undefined;
    this.isLoading = true;
    this.headers = [];
    this.isAniEmpty = true;
    this.isConnectionError = false;
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
  }

  private setSeasonIntervalHelper(season, year, opt) {
    //var tmpMap: Map<string, number> = new Map<string, number>();
    var tmpMap = {};
    tmpMap["season"] = season;
    tmpMap["year"] = year;
    tmpMap["opt"] = opt;
    this.seasonLis.push(tmpMap);
  }

  public getTopAnime(page: string, subtype: string) {
    var tmpUrl = this.jikanService.jikan_url_aws + "/anime/top?page=" + page + "&subtype=" + subtype;
    this.jikanService.resetCache();
    var foundObservable = this.jikanService.respondCachedModel.find(x => x.url == tmpUrl);
    if(foundObservable && foundObservable.url == tmpUrl) {
      foundObservable.data.subscribe(x => {
        this.setAniTopList(x);
      });
    } else {
      try {
          this.jikanService.setTopAnime(page, subtype);
          foundObservable = this.jikanService.respondCachedModel.find(x => x.url == tmpUrl);
          foundObservable?.data.subscribe(
            x => {
              this.setAniTopList(x);
            },
            (error) => {
              this.setAniTopList(this.aniTop);
            }
          );
      } catch (err) {
        this.animeSubcriptionErrorHandler();
      }
    }
    this.clearSort();
  }

  public getSeasonalAnime(season: any, year: any) {
    var tmpUrl = this.jikanService.jikan_url_aws + "/seasonal?year=" + year + "&season=" + season;
    this.jikanService.resetCache();
    var foundObservable = this.jikanService.respondCachedModel.find(x => x.url == tmpUrl);
    if(foundObservable && foundObservable.url == tmpUrl) {
      foundObservable.data.subscribe(x => {
        this.setAniList(x);
      });
    } else {
      try {
        if(season != null && year != null) {
          this.jikanService.setAnimeBySeasonYear(season, year);
          foundObservable = this.jikanService.respondCachedModel.find(x => x.url == tmpUrl);
          foundObservable?.data.subscribe(x => {
            this.setAniList(x);
          });
        } else {
          this.jikanService.getSeasonalAnime()
          .subscribe(
            x => {
              this.setAniList(x);
            },
            (error) => {
              this.setAniList(this.aniList);
            }
          );
        }
      } catch (err) {
        this.animeSubcriptionErrorHandler();
      }
    }
    this.clearSort();
  }

  public getAnimeByTitle(title: any) {
    var tmpUrl = this.jikanService.jikan_url_aws + "/search?title=" + title;
    this.jikanService.resetCache();
    var foundObservable = this.jikanService.respondCachedModel.find(x => x.url == tmpUrl);
    if(foundObservable && foundObservable.url == tmpUrl) {
      foundObservable.data.subscribe(x => {
        this.setAniList(x);
      });
    } else {
      try {
        this.jikanService.setAnimeByTitle(title);
        foundObservable = this.jikanService.respondCachedModel.find(x => x.url == tmpUrl);
        foundObservable?.data.subscribe(x => {
          this.setAniList(x);
          },
          (error) => {
            this.setAniList(this.aniList);
          }
        );
      } catch (err) {
        this.animeSubcriptionErrorHandler();
        // this.strTitle = '';
      }
    }
    this.clearSort();
  }

  private animeSubcriptionErrorHandler() {
    this.isConnectionError = true;
    this.isLoading = false;
    this.isAniEmpty = true;
  }

  private setAniList(lst: AniList[]) {
    if(lst == null || lst.length === 0) {
      this.isConnectionError = false;
      this.isAniEmpty = true;
      this.isLoading = false;
    } else {
      this.isConnectionError = false;
      this.isAniEmpty = false;
      this.aniList = this.recurRemoveHentai(lst);
      this.isLoading = false;
      if(this.isMobile) {
        this.aniListShow = this.aniList.slice(0, 5);
      } else {
        this.aniListShow = this.aniList.slice(0, 48);
      }
      this.pageSize = this.aniList.length;  
    }
    // this.strTitle = '';
    this.isTopAnime = false;
  }

  private setAniTopList(lst: AniTop[]) {
    if(lst == null || lst.length === 0) {
      this.isConnectionError = false;
      this.isAniEmpty = true;
      this.isLoading = false;
    } else {
      this.isConnectionError = false;
      this.isAniEmpty = false;
      this.aniTop = lst;
      this.isLoading = false;
      this.aniTopShow = this.aniTop;
    }
    this.isTopAnime = true;
    // this.strTitle = '';
  }

  private recurRemoveHentai(lst: AniList[]) {
    if(lst[0].genres == undefined) {
      for(var i = 0; i < lst.length; i++) {
          if(lst[i].rated === "Rx") {
            lst.splice(i,1);
            this.recurRemoveHentai(lst);
          }
      }
    } else {
      for(var i = 0; i < lst.length; i++) {
        for(var j = 0; j < lst[i].genres.length; j++) {
          if(lst[i].genres[j]["mal_id"] === 12) {
            lst.splice(i,1);
            this.recurRemoveHentai(lst);
          }
        }
      }
    }

    return lst;
  }

  public toggleAdvSearch() {
    this.isHidden = !this.isHidden;
  }

  public openTorrentModal(title, imageSrc, episode, type, animeId, animeObject) {
    const modalRef = this.modelService.open(AnimeModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.imageSrc = imageSrc;
    modalRef.componentInstance.episode = episode;
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.animeId = animeId;
    modalRef.componentInstance.aniObject = animeObject;
    modalRef.componentInstance.isTopAnime = this.isTopAnime;

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
    let startIndex = $event.pageIndex * $event.pageSize;
    let endIndex = startIndex + $event.pageSize;
    if(endIndex > this.pageSize){
      endIndex = this.pageSize;
    }
    this.aniListShow = this.aniList.slice(startIndex, endIndex);
  }

  public topAnimeOnPageChange($event) {
    var idx = $event.pageIndex;
    this.topAnimeIndex = +idx + 1;
    this.getTopAnime(this.topAnimeIndex.toString(), '')
  }

  public convertToTitleCase(value:string): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  }

  public enablingAdvanceSearch() {
    if (this.isAdv) {
      this.isAdv = false;
      this.isFilter = false;
    } else {
      this.isAdv = true;
      this.isFilter = false;
    }
  }

  public enablingFilter() {
    if (this.isFilter) {
      this.isFilter = false;
      this.isAdv = false;
    } else {
      this.isFilter = true;
      this.isAdv = false;
    }
  }

  public onSortChange(value) {
    this.selectedSort = sortOptionEnum.NOTHING;

    switch(value) {
      case "RATE":
        this.selectedSort = sortOptionEnum.RATE;
        break;
      default:
        this.selectedSort = sortOptionEnum.NOTHING;
        break;
    }
    this.sortAniList(this.selectedSort);
  }
  
  private sortAniList(opt: sortOptionEnum) {
    switch(opt) {
      case sortOptionEnum.RATE:
        console.log("HIT");
        if(this.sort_rate == 0) {
          this.aniList = this.aniList.sort((a, b) => a.score < b.score ? 1 : -1);
          this.sort_rate = 1;
        } else {
          this.aniList = this.aniList.sort((a, b) => a.score > b.score ? 1 : -1);
          this.sort_rate = 0;
        }
        break;
      default:
        this.aniList = this.aniList
        break;
    };

    if(this.isMobile) {
      this.aniListShow = this.aniList.slice(0, 5);
    } else {
      this.aniListShow = this.aniList.slice(0, 48);
    }
    this.pageSize = this.aniList.length;  
  }

  public backToTop(event) {
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 }
}
