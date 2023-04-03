import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AniDetail } from 'src/app/model/animeDetail.model';
import { AniEpisodesList } from 'src/app/model/animeEpisodes.model';
import { searchList } from 'src/app/model/searchList';
import { JikanService } from 'src/app/service/jikan/jikan.service';
import { NyaaService } from 'src/app/service/nyaa/nyaa.service';
import { DomSanitizer } from '@angular/platform-browser';

/*
  This modal hold anime's torrent detail
*/
@Component({
  selector: 'app-anime-modal',
  templateUrl: './anime-modal.component.html',
  providers: [NyaaService, JikanService],
  styleUrls: ['./anime-modal.component.css']
})
export class AnimeModalComponent implements OnInit {

  @Input() isStream = false as boolean; 
  @Input() title;
  @Input() imageSrc;
  @Input() episode;
  @Input() type;
  @Input() animeId;
  // This can either be, aniList, aniTop, etc ..etc
  @Input() aniObject;
  @Input() isTopAnime;
  @Input() isHentai = false as boolean;


  
  panelOpenState = false;
  param_name:string = "";
  param_ep: string = "";

  searchList : searchList[] = [];
  pageSize: number = 25;

  searchListEpisode: searchList [] = [];
  // store current index
  searchListEpisodeCurrent : searchList[] = [];
  // store first index, as we have to tweak the pagination
  searchListEpisodeFirstIndex : searchList[] = [];
  searchListEpisodeCount :  number = 0;
  searchListEpisodeCurrentIndex: number = 0;



  searchListBatch: searchList [] = [];
  // store current index
  searchListBatchCurrent : searchList[] = [];
  // store first index, as we have to tweak the pagination
  searchListBatchFirstIndex : searchList[] = [];
  searchListBatchCount :  number = 0;
  searchListBatchCurrentIndex: number = 0;

  searchListDub: searchList [] = [];
  // store current index
  searchListDubCurrent : searchList[] = [];
  // store first index, as we have to tweak the pagination
  searchListDubFirstIndex : searchList[] = [];
  searchListDubCount :  number = 0;
  searchListDubCurrentIndex: number = 0;


  searchListCustom: searchList [] = [];

  aniEpList: AniEpisodesList[] = [];
  aniDetail: AniDetail | undefined;
  screen: number = 0;

  nonMalAnimeEpisode: number | undefined;
  isLoading: boolean = true;
  isFound: boolean = false;
  isNonMal: boolean = false;

  isMobile: boolean = false;
  numberOfEpisode: any;

  // handle episode array on ui
  items:  number[] = [];

  constructor(private nyaaService : NyaaService, 
    public activeModal: NgbActiveModal, 
    private jikanService: JikanService,
    private breakpointObserver: BreakpointObserver,
    private sanitizer:DomSanitizer
    ) { }

  ngOnInit() {
    this.breakpointObserverEvent();
    this.getAnimeDetail();
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


  clean() {
    this.isLoading = true;
  }

  createRange(number){
    if (number) {
      for(var i = 1; i <= number; i++){
        this.items.push(i);
      }
    } else {
      this.items = [];
    }

  }

  parentTabClick(event) {
    let searchStr;

    switch (event.index) {
      case 0: 
        break;
      case 1:
        break;
      case 2:
        searchStr = this.title + " batch"
        this.getSearch(searchStr, -1, 'batch');
        break;
      case 3:
        break;
      default:
        break;
    }

  }

  episodeTabLick(event) {
    this.getSearch(this.title, event.index + 1, 'episode');
  }

  episodeDubTabLick(event) {
    this.getSearch(this.title + " dub", event.index + 1, 'dub');
  }

  getSearch(name: string, ep: number, type: string) {

    this.isLoading = true;
    if (this.isHentai) {
      this.nyaaService.GetSearchNyaaSukebeiAnime(name).subscribe(
        searchList => {
        this.setSearchList(searchList, type);
        },
        (error) => {
          this.setSearchList(this.searchList, type);
        }
      );
    } else {
      if(ep == -1) {
        this.nyaaService.getSearchByName(name).subscribe(
          searchList => {
          this.setSearchList(searchList, type);
          },
          (error) => {
            this.setSearchList(this.searchList, type);
          }
        );
      } else {
        var str;
        if(ep == -2) {
          str = name;
        } else {
          str = name + ep;
        }
  
        if (this.nyaaService.respondMapAnimeEpisode[str] != null) {
          this.nyaaService.respondMapAnimeEpisode[str].subscribe(searchList => {
              this.setSearchList(searchList, type);
            },
            (error)=> {
              this.setSearchList(this.searchList, type);
          });
        } else {
          this.nyaaService.setSearchByNameEp(name, ep);
          this.nyaaService.respondMapAnimeEpisode[str].subscribe(searchList => {
            this.setSearchList(searchList, type);
            },
            (error)=> {
              this.setSearchList(this.searchList, type);
          });
        }
      }
    }

  }

  setSearchList(lst: searchList[], type: string) {

    if(lst == null || lst.length === 0) {
      this.isFound = false;

      if  (type == 'dub') {
        this.searchListDub = [];
        this.searchListDubCurrent = [];
        this.searchListDubFirstIndex =  [];
        this.searchListDubCount = 0;
      } else if (type == 'batch') {
        this.searchListBatch = [];
        this.searchListBatchCurrent = [];
        this.searchListBatchFirstIndex =  [];
        this.searchListBatchCount = 0;
      } else if (type == 'episode') {
        this.searchListEpisode = [];
        this.searchListEpisodeCurrent = [];
        this.searchListEpisodeFirstIndex =  [];
        this.searchListEpisodeCount = 0;
      } else {
        // no use
        this.searchList = [];
      }

    } else {
      this.isFound = true;

      if  (type == 'dub') {
        this.searchListDub = lst;
        this.searchListDubCurrent = this.searchListDub;
        this.searchListDubFirstIndex =  this.searchListDub.slice(0, this.pageSize);
        this.searchListDubCount = this.searchListDub.length;
        let $event = { pageIndex: 0, pageSize: this.searchListDubCount };
        this.onPageChange($event, "DUB");


      } else if (type == 'batch') {
        this.searchListBatch = lst;
        this.searchListBatchCurrent = this.searchListBatch;
        this.searchListBatchFirstIndex =  this.searchListBatch.slice(0, this.pageSize);
        this.searchListBatchCount = this.searchListBatch.length;
        let $event = { pageIndex: 0, pageSize: this.searchListBatchCount };
        this.onPageChange($event, "BATCH");
      } else if (type == 'episode') {
        this.searchListEpisode = lst;
        this.searchListEpisodeCurrent = this.searchListEpisode;
        this.searchListEpisodeFirstIndex =  this.searchListEpisode.slice(0, this.pageSize);
        this.searchListEpisodeCount = this.searchListEpisode.length;
        let $event = { pageIndex: 0, pageSize: this.searchListEpisodeCount };
        this.onPageChange($event, "EP");
      } else {
        this.searchList = lst;
      }
    }

    this.isLoading = false;

  }

  onPageChange($event: { pageIndex: number; pageSize: number; }, type: string) {

    if (type === 'DUB') {
      if($event.pageSize == this.searchListDub.length) {
        this.searchListDubCurrent = this.searchListDub.slice(0, this.pageSize);
      } else {
        this.searchListDubCurrent = this.searchListDub.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  
      }
      this.searchListDubCurrentIndex = $event.pageIndex;
      this.pageSize = $event.pageSize;
    } 
    else if (type === 'EP') 
    {
      if($event.pageSize == this.searchListEpisode.length) {
        this.searchListEpisodeCurrent = this.searchListEpisode.slice(0, this.pageSize);
      } else {
        this.searchListEpisodeCurrent = this.searchListEpisode.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  
      }
      this.searchListEpisodeCurrentIndex = $event.pageIndex;
      this.pageSize = $event.pageSize;
    } 
    else if (type === 'BATCH') 
    {
      if($event.pageSize == this.searchListBatch.length) {
        this.searchListBatchCurrent = this.searchListBatch.slice(0, this.pageSize);
      } else {
        this.searchListBatchCurrent = this.searchListBatch.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  
      }
      this.searchListBatchCurrentIndex = $event.pageIndex;
      this.pageSize = $event.pageSize;
    }

  }


  getAnimeDetail() {
    if(this.jikanService.respondMapAnimeDetail[this.animeId] != null) {
      this.jikanService.respondMapAnimeDetail[this.animeId].subscribe(item => {
        this.aniDetail = item;
        if(item.status === "Not yet aired") {
          this.numberOfEpisode = undefined;
          this.createRange(this.numberOfEpisode);
          this.isLoading = false;
        } else if (item.status === "Currently Airing") {
          this.getDifferenceInDays(item);
        } else {
          this.numberOfEpisode = this.episode;
          this.createRange(this.numberOfEpisode);
          this.isLoading = false;
        }
      });
    } else {
      this.jikanService.setAnimeDetail(this.animeId);
      this.jikanService.respondMapAnimeDetail[this.animeId].subscribe(item => {
        this.aniDetail = item;
        if(item.status === "Not yet aired") {
          this.numberOfEpisode = undefined;
          this.createRange(this.numberOfEpisode);
          this.isLoading = false;
        } else if (item.status === "Currently Airing") {
          this.getDifferenceInDays(item);
        } else {
          this.numberOfEpisode = this.episode;
          this.createRange(this.numberOfEpisode);
          this.isLoading = false;
        }
      });
    }





  }


  getDifferenceInDays(item) {
    var from = new Date(item.aired["from"]);
    var to = new Date();
    var diff_time = to.getTime() - from.getTime();
    var diff_day = diff_time / (1000 * 3600 * 24);
    this.numberOfEpisode = Math.round(diff_day /7);
    this.isLoading = false;
  }
  

  getClick() {
  }

  
  getDownloadLink(url_path: string) {
    return url_path.replace('http:','https:');
  }

  processMagnet(magnet: string) {

    var mag = magnet.replace('&', '&amp;');
    return this.sanitizer.bypassSecurityTrustUrl (mag);
    //return this.transform(mag);
  }

  
}

