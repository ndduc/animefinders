import { Component, OnInit } from '@angular/core';
import { JikanService } from '../config/jikan/jikan.service';
import { ConfigService } from '../config/myaws/config.service';
import { Search } from '../config/myaws/search';
import { NyaaService } from '../config/nyaaaws/nyaa.service';
import { searchList } from '../config/nyaaaws/searchList';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AnimeModalComponent } from '../common/modal/anime/anime-modal/anime-modal.component';
import { sortOptionEnum } from '../common/enum/enum-option/enum-option';
import { AniTop } from '../config/jikan/model/animeTop.model';
import { HentaiTop } from '../config/jikan/model/animeTop.model';
import { QuestionModalComponent } from '../common/modal/question/question-modal/question-modal.component';
import { AnimeModel } from '../config/jikan/model/anime.model';
@Component({
  selector: 'app-hentai',
  templateUrl: './hentai.component.html',
  providers: [NyaaService],
  styleUrls: ['./hentai.component.css']
})
export class HentaiComponent implements OnInit {

  sortOption = sortOptionEnum;
  isLoading: boolean = true;
  strYear: string = '';
  strTitle: string = '';
  isHidden = true;
  selected = '';
  aniList: AnimeModel[] = [];
  hentaiAniList: AnimeModel[] = [];
  aniListShow: AnimeModel[] = [];
  aniTop: HentaiTop[] = [];
  aniTopShow: HentaiTop[] = [];
  searchList: Search[] = [];
  error: any;
  headers: string[] = [];
  seasonLis: Array<{}> = [];
  panelOpenState = false;
  isTopAnime: boolean = false;
  isAniEmpty : boolean = true;
  deviceInfo: any;
  screen: number = 0;
  pageSize: any;
  optionSortObject = [{"name": "Select Sort Option", "type": "NOTHING"}, {"name": "Sort By Rate", "type":"RATE"}, {"name": "Sort By Type", "type":"TYPE"}];
  selectedOptionSort = this.optionSortObject[0];
  sort_type = 0;
  sort_rate = 0;
  selectedSort: any;
  closeResult = '';
  topAnimeIndex: any;
  
  constructor(private jikanService: JikanService, 
    private configService: ConfigService, public modelService: NgbModal,
    private deviceService: DeviceDetectorService) { 
    }

  ngOnInit(): void {
    this.setSeasonInterval();
    this.getSeasonalAnime(null,null);
    this.screenDetector();
  }

  screenDetector() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if(isMobile) {
      this.screen = 1;
    } else if (isTablet) {
      this.screen = 2;
    } else {
      this.screen = 0;
    }

  }

  clear() {
    this.error = undefined;
    this.isLoading = true;
    this.headers = [];
    this.isAniEmpty = true;
  }


  setSeasonInterval() {
    var year = new Date().getFullYear();
    var month = new Date().getMonth() - 1;
    if(month >= 1 && month <= 3 ) {
      this.setSeasonIntervalHelper("summer", year+1, "future"); //up coming
      this.setSeasonIntervalHelper("spring", year, "current");
      this.setSeasonIntervalHelper("winter", year-1, "past");
      this.setSeasonIntervalHelper("fall", year-1, "past");
      this.setSeasonIntervalHelper("summer", year-1, "past");
    } else if (month >= 4 && month <= 6) {
      this.setSeasonIntervalHelper("fall", year+1, "future"); //up coming
      this.setSeasonIntervalHelper("summer", year, "current");
      this.setSeasonIntervalHelper("spring", year, "past");
      this.setSeasonIntervalHelper("winter", year-1, "past");
      this.setSeasonIntervalHelper("fall", year-1, "past");
    } else if (month >= 7 && month <= 9) {
      this.setSeasonIntervalHelper("winter", year+1, "future"); //up coming
      this.setSeasonIntervalHelper("fall", year, "current");
      this.setSeasonIntervalHelper("summer", year, "past");
      this.setSeasonIntervalHelper("spring", year, "past");
      this.setSeasonIntervalHelper("winter", year, "past");
    } else {
      this.setSeasonIntervalHelper("spring", year+1, "future"); //up coming
      this.setSeasonIntervalHelper("winter", year, "current");
      this.setSeasonIntervalHelper("fall", year, "past");
      this.setSeasonIntervalHelper("summer", year, "past");
      this.setSeasonIntervalHelper("spring", year, "past");
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
    var tmpUrl = this.jikanService.jikan_url_aws + "/hentai/top?page=" + page;
    // if(this.jikanService.respondCachedMap[tmpUrl] != null) {
    //   this.jikanService.respondCachedMap[tmpUrl].subscribe(aniTop => {
    //     this.setAniTopList(aniTop);
    //   });
    // } else {
    //   try {
    //       this.jikanService.setTopHentai(page);
    //       this.jikanService.respondCachedMap[tmpUrl]
    //       .subscribe(
    //         aniTop => {
    //           this.setAniTopList(aniTop);
    //         },
    //         (error) => {
    //           this.setAniTopList(this.aniTop);
    //         }
    //       );
        
    //   } catch (err) {
    //     this.isAniEmpty = true;
    //     this.isLoading = false;
    //   }
    // }

    this.clearSort();
  }

  

  getSeasonalAnime(season: any, year: any) {
    var tmpUrl = this.jikanService.jikan_url_aws + "/seasonal?year=" + year + "&season=" + season;

    // if(this.jikanService.respondCachedMap[tmpUrl] != null) {
    //   this.jikanService.respondCachedMap[tmpUrl].subscribe(aniList => {
    //     this.setAniList(aniList);
    //   });
    // } else {
    //   try {
    //     if(season != null && year != null) {
    //       this.jikanService.setAnimeBySeasonYear(season, year);
    //       this.jikanService.respondCachedMap[tmpUrl].subscribe(aniList => {
    //         this.setAniList(aniList);
    //       });
  
    //     } else {
    //       this.jikanService.getSeasonalAnime()
    //       .subscribe(
    //         aniList => {
    //           this.setAniList(aniList);
    //         },
    //         (error) => {
    //           this.setAniList(this.aniList);
    //         }
    //       );
    //     }
    //   } catch (err) {
    //     this.isAniEmpty = true;
    //     this.isLoading = false;
    //   }
    // }

    this.clearSort();
  }

  getAnimeByTitle(title: any) {
    var tmpUrl = this.jikanService.jikan_url_aws + "/search?title=" + title;
    // if(this.jikanService.respondCachedMap[tmpUrl] != null) {
    //   this.jikanService.respondCachedMap[tmpUrl].subscribe(aniList => {
    //     this.setAniList(aniList);
    //   });
    // } else {
    //   try {
    //     this.jikanService.setAnimeByTitle(title);
    //     this.jikanService.respondCachedMap[tmpUrl]
    //     .subscribe(aniList => {
    //       this.setAniList(aniList);
    //       },
    //       (error) => {
    //         this.setAniList(this.aniList);
    //       }
    //     );
    //   } catch (err) {
    //     this.isLoading = false;
    //     this.isAniEmpty = true;
    //     this.strTitle = '';
    //   }
    // }
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

    if(this.screen === 1) {
      this.aniListShow = this.aniList.slice(0, 5);
    } else {
      this.aniListShow = this.aniList.slice(0, 48);
    }
    this.pageSize = this.aniList.length;  
  }

  setAniList(lst: AnimeModel[]) {
    if(lst == null || lst.length === 0) {
      this.isAniEmpty = true;
      this.isLoading = false;
    } else {
      this.isAniEmpty = false;
      this.aniList = this.hentaiAniList;
      this.isLoading = false;
      if(this.screen === 1) {
        this.aniListShow = this.aniList.slice(0, 5);
      } else {
        this.aniListShow = this.aniList.slice(0, 48);
      }
      this.pageSize = this.aniList.length;  
    }
    this.strTitle = '';
    this.isTopAnime = false;
  }

  setAniTopList(lst: HentaiTop[]) {
    if(lst == null || lst.length === 0) {
      this.isAniEmpty = true;
      this.isLoading = false;
    } else {
      this.isAniEmpty = false;
      this.aniTop = lst;
      this.isLoading = false;
      this.aniTopShow = this.aniTop;
    }
    this.isTopAnime = true;
    this.strTitle = '';
  }

  // recurRemoveHentai(lst: AnimeModel[]) {
  //     for(var i = 0; i < lst.length; i++) {
  //       for(var j = 0; j < lst[i].genres.length; j++) {
  //         if(lst[i].genres[j]["mal_id"] === 12) {
  //           this.hentaiAniList.push(lst[i])
  //           lst.splice(i,1);
  //           this.recurRemoveHentai(lst);
  //         }
  //       }
  //     }

  //   return lst;
  // }



  
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


  openTorrentModal(title, imageSrc, episode, type, animeId) {
    const modalRef = this.modelService.open(AnimeModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.imageSrc = imageSrc;
    modalRef.componentInstance.episode = episode;
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.animeId = animeId;

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
