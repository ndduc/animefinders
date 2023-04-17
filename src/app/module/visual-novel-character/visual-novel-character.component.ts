import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VnCharacterModel } from 'src/app/model/vn-character.model';
import { VndbService } from 'src/app/service/vndb/vndb.service';

@Component({
  selector: 'app-visual-novel-character',
  templateUrl: './visual-novel-character.component.html',
  styleUrls: ['./visual-novel-character.component.css']
})
export class VisualNovelCharacterComponent implements OnInit {
  pageTitle: string = "visual-novel";
  resultColumn: number = 3;
  isMobile: boolean = false;
  isLoading: boolean = false;
  isCharacterFound: boolean = false;

  pageSize: number = 100;

  public searchYearForm = new FormGroup({});
  public searchYearName: string = 'searchYear';
  public searchAdvControl = new FormControl(null, Validators.required);
  public searchSeasonName: string = 'searchSeason';
  public searchSeasonControl = new FormControl(null, Validators.required);

  paginationId: string = "-1";
  characterList: VnCharacterModel[] = [];
  constructor( private vndbService: VndbService,
    public modelService: NgbModal,
    private breakpointObserver: BreakpointObserver,
    private router:Router ,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.breakpointObserverEvent();
    this.setUpForm();
    this.getCharacter(this.paginationId);
  }

  getCharacter(paginationId: string) {
    this.isLoading = true;
    this.vndbService.getCharacters(paginationId).subscribe(
      x => {
        if (!x.Error && x.results) {
          this.isCharacterFound = true;
        } 
        this.characterList = x.results;
        this.pageSize = x.count;
        this.characterProcesser(this.characterList);
      }
    );
  }

  public onPageChange($event) {
    let newestIndex = this.characterList.length - 1;
    this.paginationId = this.characterList[newestIndex].id;
    console.log(this.paginationId);
    this.getCharacter(this.paginationId);
  }

  private characterProcesser(lst: VnCharacterModel[]) {
    if(lst == null || lst.length === 0) {
      this.isCharacterFound = false;
    } else {
      this.isCharacterFound = true;
    }
    this.isLoading = false;
  }

  private setUpForm(): void {
    this.searchYearForm.addControl(this.searchYearName, this.searchAdvControl);
    this.searchYearForm.addControl(this.searchSeasonName, this.searchSeasonControl);
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
        this.resultColumn = 3;
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Large]) {
        this.resultColumn = 3;
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.resultColumn = 3;
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.resultColumn = 2;
        this.isMobile = true;
      } else {
        this.resultColumn = 1;
        this.isMobile = true;
      }
    });
  }

  getCharacterAlias(aliases: string[]) : string{
    if (aliases.length > 0) {
      return aliases.join(', ');
    } else {
      return "";
    }
  }

}
