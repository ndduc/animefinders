import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { searchList } from 'src/app/model/searchList';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Validators } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NyaaService } from 'src/app/service/nyaa/nyaa.service';
@Component({
  selector: 'app-anime-torrent-holder',
  templateUrl: './anime-torrent-holder.component.html',
  styleUrls: ['./anime-torrent-holder.component.css'],
  providers: [NyaaService]
})
export class AnimeTorrentHolderComponent implements OnInit, PipeTransform  {

  @Input() title;
  @Input() episode;
  @Input() longrun;
  searchList : searchList[] = [];
  constructor(
    private nyaaService : NyaaService, 
    private deviceService: DeviceDetectorService, 
    private sanitizer:DomSanitizer,
    private breakpointObserver: BreakpointObserver) { }

  isLoading: boolean = true;
  isFound: boolean = false;
  isMobile: boolean = false;

  ngOnInit(): void {
    this.breakpointObserverEvent();
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

  getSearch(name: string, ep: number) {
    if(ep == -1) {
      this.nyaaService.getSearchByName(name).subscribe(
        searchList => {
        this.setSearchList(searchList);
        },
        (error) => {
          this.setSearchList(this.searchList);
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
            this.setSearchList(searchList);
          },
          (error)=> {
            this.setSearchList(this.searchList);
        });
      } else {
        this.nyaaService.setSearchByNameEp(name, ep);
        this.nyaaService.respondMapAnimeEpisode[str].subscribe(searchList => {
          this.setSearchList(searchList);
          },
          (error)=> {
            this.setSearchList(this.searchList);
        });
      }
    }
  }


  setSearchList(lst: searchList[]) {
    if(lst == null || lst.length === 0) {
      this.isLoading = false;
      this.isFound = false;
    } else {
      this.isLoading = false;
      this.isFound = true;
      this.searchList = lst;
    }

  }

  getDownloadLink(url_path: string) {
    return url_path.replace('http:','https:');
  }

  regAllInSquareBracket = '\\[(.*?)\\]';
  regAllInRoundBracket = '\\((.*?)\\)';
  regCheckType = '\\b( \\.)[a-zA-Z]*';
  regCheckTypeNoSpace = '\\b(\\.)[a-zA-Z]*';
  regGlobal = 'g';
  itemCategory: any;
  itemCategoryRound: any;
  itemTitle: any;
  itemType: any;
  
  stringValidation(title: string) {
    const regExp = new RegExp(this.regAllInSquareBracket, this.regGlobal)
    const regExpRound = new RegExp(this.regAllInRoundBracket, this.regGlobal)
    const regExpType = new RegExp(this.regCheckType, this.regGlobal)
    const regExpTypeNoSpace = new RegExp(this.regCheckTypeNoSpace, this.regGlobal)
    this.regexExtractionSquare(title, regExp);
    this.regexExtractionRound(title, regExpRound);
    this.itemTitle = title.replace(regExp, '').replace(regExpRound, '').replace('  ', '').replace(' ', '');
    this.regexExtractionType(this.itemTitle, regExpType);
    this.itemTitle = this.itemTitle.replace(regExpType, '');
    this.regexExtractionType(this.itemTitle, regExpTypeNoSpace);
    this.itemTitle =  this.itemTitle.replace(regExpTypeNoSpace, '');
    return this.itemTitle;
  }

  regexExtractionSquare(title: string, reg: RegExp) {
    this.itemCategory = title.match(reg);
  }

  regexExtractionRound(title: string, reg: RegExp) {
    this.itemCategoryRound = title.match(reg);
  }

  regexExtractionType(title: string, reg: RegExp) {
    this.itemType = title.match(reg);
  }

  regexExtractionTypeNoSpace(title: string, reg: RegExp) {
    this.itemType = this.itemType + title.match(reg);;
  }
  

  processMagnet(magnet: string) {

    var mag = magnet.replace('&', '&amp;');
    return this.sanitizer.bypassSecurityTrustUrl (mag);
    //return this.transform(mag);
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
