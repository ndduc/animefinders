import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VnProducerModel } from 'src/app/model/vn-producer.model';
import { VndbService } from 'src/app/service/vndb/vndb.service';

@Component({
  selector: 'app-visual-novel-producer',
  templateUrl: './visual-novel-producer.component.html',
  styleUrls: ['./visual-novel-producer.component.css']
})
export class VisualNovelProducerComponent implements OnInit {
  pageTitle: string = "visual-novel";
  resultColumn: number = 6;
  isMobile: boolean = false;
  isLoading: boolean = false;
  isProducerFound: boolean = false;

  public searchYearForm = new FormGroup({});
  public searchYearName: string = 'searchYear';
  public searchAdvControl = new FormControl(null, Validators.required);
  public searchSeasonName: string = 'searchSeason';
  public searchSeasonControl = new FormControl(null, Validators.required);

  pattern1 = /(?<=\[url=https:\/\/).*?(?=\])/; 
  pattern2 = /(?<=\[url=http:\/\/).*?(?=\])/; 

  patternForRemoval = /\[(.*?)\]/g;
  patternForRemoval2 =  /\.\s*[\w\s]+]/g;

  producerList: VnProducerModel[] = [];

  pageSize: number = 100;

  paginationId: string = "-1";


  constructor( 
    private vndbService: VndbService,
    public modelService: NgbModal,
    private breakpointObserver: BreakpointObserver,
    private router:Router ,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.breakpointObserverEvent();
    this.setUpForm();
    this.getProducers(this.paginationId);
  }

  getProducers(paginationId: string) {
    this.isLoading = true;
    this.vndbService.getProducers(paginationId).subscribe(
      x => {
        if (!x.Error && x.results) {
          this.isProducerFound = true;
        } 
        this.producerList = x.results;

        this.pageSize = x.count;
        this.produceProcesser(this.producerList);
      }
    );
  }

  getUrlFromProducerDescription(description: string) : string {
    const match1 = this.pattern1.exec(description);
    const match2 = this.pattern2.exec(description);
    if (match1) {
      return match1[0];
    } else if (match2) {
      return match2[0];
    } else {
      return "";
    }
  }

  cleanProducerDescription(description: string): string {
    return description.replace(this.patternForRemoval, '').replace(this.patternForRemoval2, '');
  }

  private produceProcesser(lst: VnProducerModel[]) {
    if(lst == null || lst.length === 0) {
      this.isProducerFound = false;
    } else {
      this.isProducerFound = true;
    }
    this.isLoading = false;
  }

  public onPageChange($event) {
    let newestIndex = this.producerList.length - 1;
    this.paginationId = this.producerList[newestIndex].id;
    console.log(this.paginationId);
    this.getProducers(this.paginationId);
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
        this.resultColumn = 5;
        this.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Large]) {
        this.resultColumn = 5;
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
