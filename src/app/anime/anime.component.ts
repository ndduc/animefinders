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


@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  providers: [NyaaService],
  styleUrls: ['./anime.component.css']
})


export class AnimeComponent implements OnInit {
  
  sortOption = sortOptionEnum;
  isLoading: boolean = true;
  strYear: string = '';
  strTitle: string = '';
  isHidden = true;
  selected = '';
  aniList: AniList[] = [];
  aniListShow: AniList[] = [];
  aniTop: AniTop[] = [];
  aniTopShow: AniTop[] = [];
  searchList: Search[] = [];
  error: any;
  headers: string[] = [];
  seasonLis: Array<{}> = [];
  panelOpenState = false;
  isTopAnime: boolean = false;
  isAniEmpty : boolean = true;
  isConnectionError: boolean = false;
  screen: number = 0;
  pageSize: any;
  optionSortObject = [{"name": "Select Sort Option", "type": "NOTHING"}, {"name": "Sort By Rate", "type":"RATE"}, {"name": "Sort By Type", "type":"TYPE"}];
  selectedOptionSort = this.optionSortObject[0];
  sort_type = 0;
  sort_rate = 0;
  selectedSort: any;
  closeResult = '';
  topAnimeIndex: any;
  
  topAnimeNumberOfColumn = 4;
  seasonAnimeNumberOfColumn = 4;
  isMobile = false;

  public searchForm = new FormGroup({});
  public searchName = 'searchName';
  public searchControl = new FormControl(null, Validators.required);

  
  constructor(private jikanService: JikanService, 
    private configService: ConfigService, public modelService: NgbModal,
    private deviceService: DeviceDetectorService,
    private breakpointObserver: BreakpointObserver) { 
    }


  ngOnInit(): void {
    this.setSeasonInterval();
    this.getSeasonalAnime(null,null);
    // this.screenDetector();
    this.setUpForm();
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
  }

  clear() {
    this.error = undefined;
    this.isLoading = true;
    this.headers = [];
    this.isAniEmpty = true;
    this.isConnectionError = false;
  }


  setSeasonInterval() {
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

  setSeasonIntervalHelper(season, year, opt) {
    //var tmpMap: Map<string, number> = new Map<string, number>();
    var tmpMap = {};
    tmpMap["season"] = season;
    tmpMap["year"] = year;
    tmpMap["opt"] = opt;
    this.seasonLis.push(tmpMap);
  }

  getTopAnime(page: string, subtype: string) {
    var tmpUrl = this.jikanService.jikan_url_aws + "/anime/top?page=" + page + "&subtype=" + subtype;
    if(this.jikanService.respondMap[tmpUrl] != null) {
      this.jikanService.respondMap[tmpUrl].subscribe(aniTop => {
        this.setAniTopList(aniTop);
      });
    } else {
      try {
          this.jikanService.setTopAnime(page, subtype);
          this.jikanService.respondMap[tmpUrl]
          .subscribe(
            aniTop => {
              this.setAniTopList(aniTop);
            },
            (error) => {
              this.setAniTopList(this.aniTop);
            }
          );
        
      } catch (err) {
        this.isConnectionError = true;
        this.isAniEmpty = true;
        this.isLoading = false;
      }
    }


    this.clearSort();
  }

  

  getSeasonalAnime(season: any, year: any) {
    var tmpUrl = this.jikanService.jikan_url_aws + "/seasonal?year=" + year + "&season=" + season;

    if(this.jikanService.respondMap[tmpUrl] != null) {
      this.jikanService.respondMap[tmpUrl].subscribe(aniList => {
        this.setAniList(aniList);
      });
    } else {
      try {
        if(season != null && year != null) {
          this.jikanService.setAnimeBySeasonYear(season, year);
          this.jikanService.respondMap[tmpUrl].subscribe(aniList => {
            this.setAniList(aniList);
          });
  
        } else {
          this.jikanService.getSeasonalAnime()
          .subscribe(
            aniList => {
              this.setAniList(aniList);
            },
            (error) => {
              this.setAniList(this.aniList);
            }
          );
        }
      } catch (err) {
        this.isConnectionError = true;
        this.isAniEmpty = true;
        this.isLoading = false;
      }
    }

    this.clearSort();
  }

  getAnimeByTitle(title: any) {
    var tmpUrl = this.jikanService.jikan_url_aws + "/search?title=" + title;
    if(this.jikanService.respondMap[tmpUrl] != null) {
      this.jikanService.respondMap[tmpUrl].subscribe(aniList => {
        this.setAniList(aniList);
      });
    } else {
      try {
        this.jikanService.setAnimeByTitle(title);
        this.jikanService.respondMap[tmpUrl]
        .subscribe(aniList => {
          this.setAniList(aniList);
          },
          (error) => {
            this.setAniList(this.aniList);
          }
        );
      } catch (err) {
        this.isConnectionError = true;
        this.isLoading = false;
        this.isAniEmpty = true;
        // this.strTitle = '';
      }
    }
    this.clearSort();
  }


  onSortChange(value) {
    this.selectedSort = value.name;
    if(value.type == "RATE") {
      this.selectedSort = sortOptionEnum.RATE;
    } else if (value.type == "TYPE") {
      this.selectedSort = sortOptionEnum.TYPE;
    } else {
      this.selectedSort = "NOTHING";
    }
  }
  sortAniList(opt: sortOptionEnum) {

    switch(opt) {
      case sortOptionEnum.RATE:
        if(this.sort_rate == 0) {
          this.aniList = this.aniList.sort((a, b) => a.score < b.score ? 1 : -1);
          this.sort_rate = 1;
        } else {
          this.aniList = this.aniList.sort((a, b) => a.score > b.score ? 1 : -1);
          this.sort_rate = 0;
        }
        break;
      case sortOptionEnum.TYPE:
        if(this.sort_type == 0) {
          this.aniList = this.aniList.sort((a, b) => a.type < b.type ? 1 : -1);
          this.sort_type = 1;
        } else {
          this.aniList = this.aniList.sort((a, b) => a.type > b.type ? 1 : -1);
          this.sort_type = 0;
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

  setAniList(lst: AniList[]) {
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

  setAniTopList(lst: AniTop[]) {
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

  recurRemoveHentai(lst: AniList[]) {
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



  
  getNyaaSearch() {
    this.configService.getNyaaSearch().subscribe(searchList => {
        this.searchList = searchList;
      });
  }
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
      items.push(i);
    }
    return items;
  }

  toggleAdvSearch() {
    this.isHidden = !this.isHidden;
  }


  openTorrentModal(title, imageSrc, episode, type, animeId, animeObject) {
    const modalRef = this.modelService.open(AnimeModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.imageSrc = imageSrc;
    modalRef.componentInstance.episode = episode;
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.animeId = animeId;
    modalRef.componentInstance.aniObject = animeObject;
  }


  openQAModal() {
    const modalRef = this.modelService.open(QuestionModalComponent);
    modalRef.componentInstance.title = "TEST";
    modalRef.componentInstance.imageSrc = "TEST";
    modalRef.componentInstance.episode = "TEST";
    modalRef.componentInstance.type = "TEST";
    modalRef.componentInstance.animeId = "TEST";

  }

  checkIsNumber(episode) {
    if(episode > 0) {
      return true;
    } else {
      return false;
    }
  }

  clearSort() {
    this.sort_type = 0;
    this.sort_rate = 0;
  }


  onPageChange($event) {
    let startIndex = $event.pageIndex * $event.pageSize;
    let endIndex = startIndex + $event.pageSize;
    if(endIndex > this.pageSize){
      endIndex = this.pageSize;
    }
    this.aniListShow = this.aniList.slice(startIndex, endIndex);
  }


  topAnimeOnPageChange($event) {
    var idx = $event.pageIndex;
    this.topAnimeIndex = +idx + 1;
    this.getTopAnime(this.topAnimeIndex.toString(), '')
  }

  convertToTitleCase(value:string): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  }



  open(content) {
    this.modelService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  modelSaveClick() {
    if(this.selectedSort !== 'NOTHING') {
      this.sortAniList(this.selectedSort);
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
