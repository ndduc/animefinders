import { Component, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimeModalComponent } from '../../dialog/anime/anime-modal/anime-modal.component';
import { QuestionModalComponent } from '../../dialog/question/question/question-modal/question-modal.component';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AnimeSortModel } from '../../model/anime-sort-model.model';
import { sortOptionEnum } from '../../enum/enum-option/enum-option';
import { AnimePaginationModel } from '../../model/anime-pagination.model';
import { AnimeModel } from '../../model/anime.model';
import { AniTop } from '../../model/animeTop.model';
import { JikanService } from '../../service/jikan/jikan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeModelDetailComponent } from 'src/app/dialog/anime/anime-model-detail/anime-model-detail.component';
import { VndbService } from 'src/app/service/vndb/vndb.service';
import { VnSearchModel } from 'src/app/model/vn-search.model';
import { VnImageModel } from 'src/app/model/vn-image.model';
import { VisualNovelModalComponent } from 'src/app/dialog/visual-novel/visual-novel-modal/visual-novel-modal.component';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-visual-novel',
  templateUrl: './visual-novel.component.html',
  styleUrls: ['./visual-novel.component.css']
})

export class VisualNovelComponent implements OnInit {
  pageTitle: string = "visual-novel";
  selected = '';
  error: any;
  headers: string[] = [];
  panelOpenState: boolean = false;
  isTopVisualNovel: boolean = false;
  isVisualNovelEmpty : boolean = true;
  isConnectionError: boolean = false;
  screen: number = 0;
  pageSize: any;
  closeResult = '';
  topAnimeIndex: any;
  
  topAnimeNumberOfColumn: number = 4;
  isMobile: boolean = false;

  paginationObject: AnimePaginationModel = {} as AnimePaginationModel ;


  public searchYearForm = new UntypedFormGroup({});
  public searchYearName: string = 'searchYear';
  public searchAdvControl = new UntypedFormControl(null, Validators.required);
  public searchSeasonName: string = 'searchSeason';
  public searchSeasonControl = new UntypedFormControl(null, Validators.required);
  
  selectedIndex: number = 1;
  strTitle: string = '';
  selectedYear: number = new Date().getFullYear();
  selectedSeason: string = "";
  currentPage: number = 1;
  selectedFilter: string = '';
  isSearchByTitleActivated: boolean = false;
  searchTitle: string = "";




  vnSearchLists: VnSearchModel[] = [];
  vnSearchLoading: boolean = false;
  vnSearchFound: boolean = false;

  constructor(
    private vndbService: VndbService,
    public modelService: NgbModal,
    private breakpointObserver: BreakpointObserver,
    private router:Router ,
    private route: ActivatedRoute
    ) { 
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.vnSearchLoading = true;
      if(params.get('filter') === 'popularity') {
        console.log("1");
        this.selectedFilter =  String(params.get('filter'));
        this.getTopVisualNovel(this.selectedFilter);
      } else if(params.get('filter') === 'rating') {
        console.log("2");
        this.selectedFilter =  String(params.get('filter'));
        this.getTopVisualNovel(this.selectedFilter);
      } else {
        console.log("3");
        this.selectedFilter =  String(params.get('filter'));
        this.getTopVisualNovel(this.selectedFilter);
      }

    });


    //this.getTopVnByPopularity();

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
    this.vnSearchLoading = true;
    this.headers = [];
    this.isVisualNovelEmpty = true;
    this.isConnectionError = false;
  }

  // public getVnTitleImage(image: VnImageModel) {
  //   console.log(image.url);
  //   return image[0];
  // }

  public getTopVisualNovel(filter: string) {
    this.vnSearchLoading = true;
    this.currentPage = 1;
    this.isSearchByTitleActivated = false;
    this.getTopVisualNovelHelper(filter);
    this.clearSort();
  }

  public getTopVisualNovelHelper(filter: string) {

    if (filter === "popularity") {
      this.vndbService.getVnByPopularity().subscribe(
        x => {
          if (!x.Error && x.results) {
            this.vnSearchFound = true;
          } 
          this.vnSearchLists = x.results;
          this.setAniVisualNovelList(x.results);
        }
      );
    } else if (filter === "rating") {
      this.vndbService.getVnByRating().subscribe(
        x => {
          if (!x.Error && x.results) {
            this.vnSearchFound = true;
          } 
          this.vnSearchLists = x.results;
          this.setAniVisualNovelList(x.results);
        }
      );
    }
  }



  private setAniVisualNovelList(lst: VnSearchModel[]) {
    if(lst == null || lst.length === 0) {
      this.isConnectionError = false;
      this.isVisualNovelEmpty = true;
      this.vnSearchLoading = false;
      this.vnSearchFound = false;
    } else {
      this.isConnectionError = false;
      this.isVisualNovelEmpty = false;
      this.vnSearchLoading = false;
      this.vnSearchFound = true;
    }
    this.isTopVisualNovel = true;
  }



  public openTorrentModal(vnSearchModel) {
    const modalRef = this.modelService.open(VisualNovelModalComponent, {size:'lg'})
    modalRef.componentInstance.vnSearchModel = vnSearchModel;
    
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
    // this.sort_type = 0;
    // this.sort_rate = 0;
  }


  public topAnimeOnPageChange($event) {
    this.currentPage = $event.pageIndex + 1;
   // this.getTopVisualNovelHelper(this.currentPage, this.selectedType, this.selectedFilter);
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
