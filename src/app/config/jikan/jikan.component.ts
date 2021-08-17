import { Component, OnInit } from '@angular/core';
import { JikanService} from './jikan.service';
import { AniList} from './animelist';
import { Search} from '../myaws/search';
import {ConfigService} from '../myaws/config.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AnimeModalComponent } from 'src/app/common/modal/anime/anime-modal/anime-modal.component';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-jikan',
  templateUrl: './jikan.component.html',
  providers: [JikanService],
  styleUrls: ['./jikan.component.css']
})


export class JikanComponent implements OnInit {
  isLoading: boolean = true;
  
  strYear: string = '';
  strTitle: string = '';
  isHidden = true;
  selected = '';
  aniList: AniList[] = [];
  aniListShow: AniList[] = [];
  searchList: Search[] = [];
  error: any;
  headers: string[] = [];
  seasonLis: Array<{}> = [];
  panelOpenState = false;

  isAniEmpty : boolean = true;

  deviceInfo;

  screen: number = 0;
  pageSize;
  
  constructor(private jikanService: JikanService, private configService: ConfigService, public modelService: NgbModal,
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
      this.setSeasonIntervalHelper("summer", year, "future"); //up coming
      this.setSeasonIntervalHelper("spring", year, "current");
      this.setSeasonIntervalHelper("winter", year-1, "past");
      this.setSeasonIntervalHelper("fall", year-1, "past");
      this.setSeasonIntervalHelper("summer", year-1, "past");
    } else if (month >= 4 && month <= 6) {
      this.setSeasonIntervalHelper("fall", year, "future"); //up coming
      this.setSeasonIntervalHelper("summer", year, "current");
      this.setSeasonIntervalHelper("spring", year, "past");
      this.setSeasonIntervalHelper("winter", year-1, "past");
      this.setSeasonIntervalHelper("fall", year-1, "past");
    } else if (month >= 7 && month <= 9) {
      this.setSeasonIntervalHelper("winter", year, "future"); //up coming
      this.setSeasonIntervalHelper("fall", year, "current");
      this.setSeasonIntervalHelper("summer", year, "past");
      this.setSeasonIntervalHelper("spring", year, "past");
      this.setSeasonIntervalHelper("winter", year-1, "past");
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


  getSeasonalAnime(season: any, year: any) {
    try {
      if(season != null && year != null) {
        this.jikanService.getAnimeBySeasonYear(season, year)
        .subscribe(aniList => {
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
      this.isAniEmpty = true;
      this.isLoading = false;
    }
    
  }

  getAnimeByTitle(title: any) {
    try {
      this.jikanService.getAnimeByTitle(title)
      .subscribe(aniList => {
        this.setAniList(aniList);
        },
        (error) => {
          this.setAniList(this.aniList);
        }
      );
    } catch (err) {
      this.isLoading = false;
      this.isAniEmpty = true;
    }

  }

  setAniList(lst: AniList[]) {
    if(lst == null || lst.length === 0) {
      this.isAniEmpty = true;
      this.isLoading = false;
    } else {
      this.isAniEmpty = false;
      this.aniList = lst;
      this.isLoading = false;
      if(this.screen === 1) {
        this.aniListShow = this.aniList.slice(0, 5);
      } else {
        this.aniListShow = this.aniList;
      }
      this.pageSize = this.aniList.length;  

    }
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


  openTorrentModal(title, imageSrc, episode, type, animeId) {
    const modalRef = this.modelService.open(AnimeModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.imageSrc = imageSrc;
    modalRef.componentInstance.episode = episode;
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.animeId = animeId;

  }

  checkIsNumber(episode) {
    if(episode > 0) {
      return true;
    } else {
      return false;
    }
  }


  onPageChange($event) {
    //this.aniListShow =  this.aniList.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);

    let startIndex = $event.pageIndex * $event.pageSize;
    let endIndex = startIndex + $event.pageSize;
    if(endIndex > this.pageSize){
      endIndex = this.pageSize;
    }
    this.aniListShow = this.aniList.slice(startIndex, endIndex);
  }

  convertToTitleCase(value:string): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  }
}
