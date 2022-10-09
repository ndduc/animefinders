import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NyaaService } from 'src/app/config/nyaaaws/nyaa.service';
import { searchList } from 'src/app/config/nyaaaws/searchList';
import { AniEpisodesList } from 'src/app/config/jikan/model/animeEpisodes.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { JikanService } from 'src/app/config/jikan/jikan.service';
import { AniDetail } from 'src/app/config/jikan/model/animeDetail.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

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


  
  panelOpenState = false;
  param_name:string = "";
  param_ep: string = "";
  searchList : searchList[] = [];
  aniEpList: AniEpisodesList[] = [];
  aniDetail: AniDetail | undefined;
  screen: number = 0;

  nonMalAnimeEpisode: number | undefined;
  isLoading: boolean = true;
  isFound: boolean = false;
  isNonMal: boolean = false;

  isMobile: boolean = false;
  numberOfEpisode: any;


  constructor(private nyaaService : NyaaService, 
    public activeModal: NgbActiveModal, 
    private deviceService: DeviceDetectorService,
    private jikanService: JikanService,
    private breakpointObserver: BreakpointObserver,
    private router: Router ) { }

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
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
      items.push(i);
    }
    return items;
  }

  getSearch(name: any, ep: any) {
    if(ep != null) {
      this.nyaaService.getSearchByName(name).subscribe(searchList => {
        this.searchList = searchList;
        this.isLoading = false;
      });
    } else {

      if (this.nyaaService.respondMapAnimeEpisode[name + ep] != null) {
        this.nyaaService.respondMapAnimeEpisode[name + ep].subscribe(searchList => {
          this.searchList = searchList;
          this.isLoading = false;
        });
      } else {
        this.nyaaService.setSearchByNameEp(name, ep);
        this.nyaaService.respondMapAnimeEpisode[name + ep].subscribe(searchList => {
          this.searchList = searchList;
          this.isLoading = false;
        });
      }
    }
  }


  getAnimeDetail() {
    var tmpUrl = this.jikanService.jikan_url_aws + "/anime/detail?animeid=" + this.animeId;
    if(this.jikanService.respondMapAnimeDetail[this.animeId] != null) {
      this.jikanService.respondMapAnimeDetail[this.animeId].subscribe(item => {
        this.aniDetail = item;
        if(item.status === "Not yet aired") {
          this.numberOfEpisode = undefined;
          this.isLoading = false;
        } else if (item.status === "Currently Airing") {
          this.getDifferenceInDays(item);
        } else {
          this.numberOfEpisode = this.episode;
          this.isLoading = false;
        }
      });
    } else {
      this.jikanService.setAnimeDetail(this.animeId);
      this.jikanService.respondMapAnimeDetail[this.animeId].subscribe(item => {
        this.aniDetail = item;
        if(item.status === "Not yet aired") {
          this.numberOfEpisode = undefined;
          this.isLoading = false;
        } else if (item.status === "Currently Airing") {
          this.getDifferenceInDays(item);
        } else {
          this.numberOfEpisode = this.episode;
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

}
