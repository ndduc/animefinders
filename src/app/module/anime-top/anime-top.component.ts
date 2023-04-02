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
import { AnimeModelDetailComponent } from 'src/app/dialog/anime/anime-model-detail/anime-model-detail.component';


@Component({
  selector: 'app-anime-top',
  templateUrl: './anime-top.component.html',
  styleUrls: ['./anime-top.component.css']
})


export class AnimeTopComponent implements OnInit {
  pageTitle: string = "anime";
  aniList: AnimeModel[] = [];
  aniListShow: AnimeModel[] = [];
  isLoading: boolean = true;
  selected = '';
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
  isMobile: boolean = false;

  paginationObject: AnimePaginationModel = {} as AnimePaginationModel ;


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
  selectedType: string = '';
  selectedFilter: string = '';
  isSearchByTitleActivated: boolean = false;
  searchTitle: string = "";
  constructor(private jikanService: JikanService, 
    public modelService: NgbModal,
    private breakpointObserver: BreakpointObserver,
    private router:Router ,
    private route: ActivatedRoute
    ) { 
    }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.isLoading = true;
      if(params.get('cat') === 'type') {
        this.selectedType = String(params.get('select'));
        this.selectedFilter = '';
        this.getTopAnime(1, this.selectedType, '');
      } else {
        this.selectedType = '';
        this.selectedFilter = String(params.get('select'));
        this.getTopAnime(1, '', this.selectedFilter);
      }
    });


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
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Large]) {
        this.topAnimeNumberOfColumn = 4;
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.topAnimeNumberOfColumn = 3;
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.topAnimeNumberOfColumn = 2;
        this.isMobile = true;
      } else {
        this.topAnimeNumberOfColumn = 1;
        this.isMobile = true;
      }
    });
  }
  

  private setUpForm(): void {
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


  public getTopAnime(page: number, type: string, filter: string) {

    this.currentPage = 1;
    this.isSearchByTitleActivated = false;
    this.getTopAnimeHelper(page, type, filter);
    this.clearSort();
  }

  public getTopAnimeHelper(page: number, type: string, filter: string) {
    this.jikanService.getTopAnime(page, type, filter).subscribe(
      x => {
        this.setAniTopList(x.data, x.pagination);
      }
    );
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
    }
    this.isTopAnime = true;
  }



  public openTorrentModal(title, imageSrc, episode, type, animeId, animeObject, isStream, rating) {
    const modalRef = this.modelService.open(AnimeModalComponent, {size:'lg'})
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.imageSrc = imageSrc;
    modalRef.componentInstance.episode = episode;
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.animeId = animeId;
    modalRef.componentInstance.aniObject = animeObject;
    modalRef.componentInstance.isTopAnime = this.isTopAnime;
    modalRef.componentInstance.isStream = isStream;

    if (rating === "Rx - Hentai") {
      modalRef.componentInstance.isHental = true;
    } else  {
      modalRef.componentInstance.isHental = false;
    }
    
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


  public topAnimeOnPageChange($event) {
    this.currentPage = $event.pageIndex + 1;
    this.getTopAnimeHelper(this.currentPage, this.selectedType, this.selectedFilter);
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
