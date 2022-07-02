import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NyaaService } from 'src/app/config/nyaaaws/nyaa.service';
import { searchList } from 'src/app/config/nyaaaws/searchList';
import { AniEpisodesList } from 'src/app/config/jikan/animeEpisodes';
import { DeviceDetectorService } from 'ngx-device-detector';
import { JikanService } from 'src/app/config/jikan/jikan.service';
import { AniDetail } from 'src/app/config/jikan/animeDetail';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { AniList } from 'src/app/config/jikan/animelist';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProjectModel } from '../../model/project-model';

/*
  This modal hold anime's torrent detail
*/
@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit {

  @Input() project: ProjectModel = {} as ProjectModel; 


  
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
    private breakpointObserver: BreakpointObserver ) { }

  ngOnInit() {
    this.breakpointObserverEvent();
    this.setImageObject();

  }
  
  setImageObject() {
    var imageObject: Array<object> = [];
    if (this.project && this.project.image_urls) {
      this.project.image_urls.forEach(element => {
        imageObject.push(
          {
            image : element,
            thumbImage: element,
            alt: "Alt Image",
            title: this.project.description
          }
        );
      });
    }
    this.project.imageObject = imageObject;
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
      } else if (result.breakpoints[Breakpoints.Large]) {
      } else if (result.breakpoints[Breakpoints.Medium]) {
      } else if (result.breakpoints[Breakpoints.Small]) {
      } else {
      }
    });
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


}
