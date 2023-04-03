import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VnReleaseModel } from 'src/app/model/vn-release.model';
import { VndbService } from 'src/app/service/vndb/vndb.service';

@Component({
  selector: 'app-visual-novel-release',
  templateUrl: './visual-novel-release.component.html',
  styleUrls: ['./visual-novel-release.component.css']
})
export class VisualNovelReleaseComponent implements OnInit {
  pageTitle: string = "visual-novel";
  resultColumn: number = 4;
  isMobile: boolean = false;
  isLoading: boolean = false;
  isVnFound: boolean = false;

  public searchYearForm = new FormGroup({});
  public searchYearName: string = 'searchYear';
  public searchAdvControl = new FormControl(null, Validators.required);
  public searchSeasonName: string = 'searchSeason';
  public searchSeasonControl = new FormControl(null, Validators.required);
  
  releaseList: VnReleaseModel[] = [];
  constructor(    
    private vndbService: VndbService,
    public modelService: NgbModal,
    private breakpointObserver: BreakpointObserver,
    private router:Router ,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.breakpointObserverEvent();
    this.setUpForm();
    this.getVnRelease();
  }

  private setUpForm(): void {
    this.searchYearForm.addControl(this.searchYearName, this.searchAdvControl);
    this.searchYearForm.addControl(this.searchSeasonName, this.searchSeasonControl);
  }


  getVnRelease() {
    this.isLoading = true;
    this.vndbService.getVnByRelease().subscribe(
      x => {
        if (!x.Error && x.results) {
          this.isVnFound = true;
        } 
        this.releaseList = x.results;
        this.releaseProcesser(this.releaseList);
      }
    );
  }

  private releaseProcesser(lst: VnReleaseModel[]) {
    if(lst == null || lst.length === 0) {
      this.isVnFound = false;
    } else {
      this.isVnFound = true;
    }
    this.isLoading = false;
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
        this.resultColumn = 4;
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Large]) {
        this.resultColumn = 4;
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
  
}
