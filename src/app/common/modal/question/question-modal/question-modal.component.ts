import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NyaaService } from 'src/app/config/nyaaaws/nyaa.service';
import { searchList } from 'src/app/config/nyaaaws/searchList';
import { AniEpisodesList } from 'src/app/config/jikan/animeEpisodes';
import { DeviceDetectorService } from 'ngx-device-detector';
import { JikanService } from 'src/app/config/jikan/jikan.service';
import { AniDetail } from 'src/app/config/jikan/animeDetail';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { ModalServiceService } from '../../modal-service.service';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.css'],
  providers: [NyaaService, JikanService],
})
export class QuestionModalComponent implements OnInit {

  @Input() title;
  @Input() imageSrc;
  @Input() episode;
  @Input() type;
  @Input() animeId;
  panelOpenState = false;
  param_name:string = "";
  param_ep: string = "";
  searchList : searchList[] = [];
  aniEpList: AniEpisodesList[] = [];
  aniDetail: AniDetail | undefined;
  deviceInfo;
  screen: number = 0;

  nonMalAnimeEpisode: number | undefined;
  isLoading: boolean = false;
  isFound: boolean = false;
  isNonMal: boolean = false;


  numberOfEpisode: any;

  question: any = "";

  constructor(private nyaaService : NyaaService, 
    public activeModal: NgbActiveModal, 
    private deviceService: DeviceDetectorService,
    private jikanService: JikanService,
    private qaService: ModalServiceService ) { }

  ngOnInit() {
    this.screenDetector();
  }

  addQuestion(question: any) {
    if(question.length > 5) {
      this.qaService.addQuestion(question)
      .subscribe(
      );
      this.activeModal.close('Close click');
    }
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
      // this.nyaaService.getSearchByNameEp(name, ep).subscribe(searchList => {
      //   this.searchList = searchList;
      //   this.isLoading = false;
      // });
    }
  }


  // getAnimeDetail() {
  //   this.jikanService.getAnimeDetail(this.animeId).subscribe(item => {
  //     this.aniDetail = item;
  //     if(item.status === "Not yet aired") {
  //       this.numberOfEpisode = undefined;
  //       this.isLoading = false;
  //     } else if (item.status === "Currently Airing") {
  //       this.getDifferenceInDays(item);
  //     } else {
  //       this.numberOfEpisode = this.episode;
  //       this.isLoading = false;
  //     }
  //   })
  // }


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
