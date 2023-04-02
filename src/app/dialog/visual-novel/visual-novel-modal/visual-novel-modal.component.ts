import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { searchList } from 'src/app/model/searchList';
import { VnSearchModel } from 'src/app/model/vn-search.model';
import { SukebeiService } from 'src/app/service/sukebei/sukebei.service';
import { VndbService } from 'src/app/service/vndb/vndb.service';

@Component({
  selector: 'app-visual-novel-modal',
  templateUrl: './visual-novel-modal.component.html',
  styleUrls: ['./visual-novel-modal.component.css']
})
export class VisualNovelModalComponent implements OnInit {

  @Input() vnSearchModel : VnSearchModel = {} as VnSearchModel;

  isLoading : boolean = false;
  isFound: boolean = false;
  isDetailFound: boolean = false;
  isMobile: boolean = false;
  alterTitleExist: boolean = false;

  searchList : searchList[] = [];
  pageSize: number = 25;

  searchListTitle: searchList [] = [];
  // store current index
  searchListTitleCurrent : searchList[] = [];
  // store first index, as we have to tweak the pagination
  searchListTitleFirstIndex : searchList[] = [];
  searchListTitleCount :  number = 0;
  searchListTitleCurrentIndex: number = 0;

  searchListAlter: searchList [] = [];
  // store current index
  searchListAlterCurrent : searchList[] = [];
  // store first index, as we have to tweak the pagination
  searchListAlterFirstIndex : searchList[] = [];
  searchListAlterCount :  number = 0;
  searchListAlterCurrentIndex: number = 0;

  constructor(
    private vndbService: VndbService,
    private breakpointObserver: BreakpointObserver,
    public activeModal: NgbActiveModal, 
    private sanitizer:DomSanitizer,
    private sukebeiService: SukebeiService
  ) { }

  ngOnInit(): void {
    this.breakpointObserverEvent();
    this. getSearch(this.vnSearchModel.title, "title");
    this.checkAlterTitle(this.vnSearchModel.alttitle);
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

  parentTabClick(event) {
    let searchStr : string = "";

    switch (event.index) {
      case 0: 
        // by default title
        searchStr = this.vnSearchModel.title;
        this.getSearch(searchStr, "title");
        break;
      case 1:
        // by alter title
        searchStr = this.vnSearchModel.alttitle;
        this.getSearch(searchStr, "alter");
        break;
      default:
        break;
    }

  }

  getSearch(name: string, type: string) {
    this.isLoading = true;


    this.sukebeiService.getSearchByName(name).subscribe(
      searchList => {
      this.setSearchList(searchList, type);
      },
      (error) => {
        this.setSearchList(this.searchList, type);
      }
    );
  }

  setSearchList(lst: searchList[], type: string) {

    if(lst == null || lst.length === 0) {
      this.isFound = false;

      if  (type == 'title') {
        this.searchListTitle = [];
        this.searchListTitleCurrent = [];
        this.searchListTitleFirstIndex =  [];
        this.searchListTitleCount = 0;
      } else if (type == 'alter') {
        this.searchListAlter = [];
        this.searchListAlterCurrent = [];
        this.searchListAlterFirstIndex =  [];
        this.searchListAlterCount = 0;
      } else {
        // no use
        this.searchList = [];
      }

    } else {
      this.isFound = true;

      if  (type == 'title') {
        this.searchListTitle = lst;
        this.searchListTitleCurrent = this.searchListTitle;
        this.searchListTitleFirstIndex =  this.searchListTitle.slice(0, this.pageSize);
        this.searchListTitleCount = this.searchListTitle.length;
        let $event = { pageIndex: 0, pageSize: this.searchListTitleCount };
        this.onPageChange($event, "title");


      } else if (type == 'alter') {
        this.searchListAlter = lst;
        this.searchListAlterCurrent = this.searchListAlter;
        this.searchListAlterFirstIndex =  this.searchListAlter.slice(0, this.pageSize);
        this.searchListAlterCount = this.searchListAlter.length;
        let $event = { pageIndex: 0, pageSize: this.searchListAlterCount };
        this.onPageChange($event, "alter");
      } else {
        this.searchList = lst;
      }
    }

    this.isLoading = false;

  }

  onPageChange($event: { pageIndex: number; pageSize: number; }, type: string) {

    if (type === 'title') {
      if($event.pageSize == this.searchListTitle.length) {
        this.searchListTitleCurrent = this.searchListTitle.slice(0, this.pageSize);
      } else {
        this.searchListTitleCurrent = this.searchListTitle.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  
      }
      this.searchListTitleCurrentIndex = $event.pageIndex;
      this.pageSize = $event.pageSize;
    } 
    else if (type === 'alter') 
    {
      if($event.pageSize == this.searchListAlter.length) {
        this.searchListAlterCurrent = this.searchListAlter.slice(0, this.pageSize);
      } else {
        this.searchListAlterCurrent = this.searchListAlter.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  
      }
      this.searchListAlterCurrentIndex = $event.pageIndex;
      this.pageSize = $event.pageSize;
    }

  }

  getDownloadLink(url_path: string) {
    return url_path.replace('http:','https:');
  }

  processMagnet(magnet: string) {

    var mag = magnet.replace('&', '&amp;');
    return this.sanitizer.bypassSecurityTrustUrl (mag);
    //return this.transform(mag);
  }


  checkAlterTitle(alterTitle: string): boolean {

    if(alterTitle) {
      console.log(alterTitle);
      this.alterTitleExist = true;
      return this.alterTitleExist;
    } else {
      this.alterTitleExist = false;
      return this.alterTitleExist;
    }
  }



}
