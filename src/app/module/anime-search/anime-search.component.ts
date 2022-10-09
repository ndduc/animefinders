import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AnimeModalComponent } from '../../dialog/anime/anime-modal/anime-modal.component';
import { QuestionModalComponent } from '../../dialog/question/question/question-modal/question-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit } from '@angular/core';
import { AnimeSortModel } from '../../model/anime-sort-model.model';
import { ActivatedRoute, Router } from '@angular/router';
import { sortOptionEnum } from '../../enum/enum-option/enum-option';
import { AnimePaginationModel } from '../../model/anime-pagination.model';
import { AnimeModel } from '../../model/anime.model';
import { AniTop } from '../../model/animeTop.model';
import { JikanService } from '../../service/jikan/jikan.service';
import { NyaaService } from '../../service/nyaa/nyaa.service';


@Component({
  selector: 'app-anime-search',
  templateUrl: './anime-search.component.html',
  styleUrls: ['./anime-search.component.css']
})


export class AnimeSearchComponent implements OnInit {
  
  sortOption = sortOptionEnum;
  isLoading: boolean = true;
  isAdv: boolean = false;
  isFilter: boolean = false;
  strYear: string = '';
  strTitle: string = '';
  isHidden: boolean = true;
  selected = '';
  aniList: AnimeModel[] = [];
  aniListShow: AnimeModel[] = [];
  aniTop: AniTop[] = [];
  aniTopShow: AniTop[] = [];
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

  paginationObject: AnimePaginationModel = {} as AnimePaginationModel ;

  public searchForm = new FormGroup({});
  public searchName: string = 'searchName';
  public searchControl = new FormControl(null, Validators.required);

  public searchYearForm = new FormGroup({});
  public searchYearName: string = 'searchYear';
  public searchAdvControl = new FormControl(null, Validators.required);
  public searchSeasonName: string = 'searchSeason';
  public searchSeasonControl = new FormControl(null, Validators.required);
  
  selectedYear: number = new Date().getFullYear();
  selectedSeason: string = "";
  currentPage: number = 1;
  isSearchByTitleActivated: boolean = true;
  searchTitle: string = "";

  navigationIndex: any;
  constructor(private jikanService: JikanService, 
    public modelService: NgbModal,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute
    ) { 
    }

  ngOnInit(): void {
    this.getAnimeByTitle("fate zero", 1);
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
    this.searchYearForm.addControl(this.searchSeasonName, this.searchSeasonControl);
  }

  public clear() {
    this.error = undefined;
    this.isLoading = true;
    this.headers = [];
    this.isAniEmpty = true;
    this.isConnectionError = false;
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
      // if(this.isMobile) {
      //   this.aniListShow = this.aniList.slice(0, 5);
      // } else {
      //   this.aniListShow = this.aniList.slice(0, 48);
      // }

      this.paginationObject = originalList;
      this.aniListShow = this.aniList;
      this.pageSize = this.paginationObject.items.total;  
      this.currentPage = this.paginationObject.current_page;
    }
    // this.strTitle = '';
    this.isTopAnime = false;
  }




  public toggleAdvSearch() {
    this.isHidden = !this.isHidden;
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
      case "RATE_DESC":
        this.selectedSort = sortOptionEnum.RATE_DESC;
        break;
      case "RATE_ASC":
        this.selectedSort = sortOptionEnum.RATE_ASC;
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
        if(this.sort_rate == 0) {
          this.aniList = this.aniList.sort((a, b) => a.score < b.score ? 1 : -1);
          this.sort_rate = 1;
        } else {
          this.aniList = this.aniList.sort((a, b) => a.score > b.score ? 1 : -1);
          this.sort_rate = 0;
        }
        break;
      case sortOptionEnum.RATE_DESC:
          this.aniList = this.aniList.sort((a, b) => a.score < b.score ? 1 : -1);
        break;
      case sortOptionEnum.RATE_ASC:
          this.aniList = this.aniList.sort((a, b) => a.score > b.score ? 1 : -1);
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