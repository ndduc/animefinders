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

  producerList: VnProducerModel[] = [];


  constructor( 
    private vndbService: VndbService,
    public modelService: NgbModal,
    private breakpointObserver: BreakpointObserver,
    private router:Router ,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.breakpointObserverEvent();
    this.setUpForm();
    this.getProducers();
  }

  getProducers() {
    this.isLoading = true;
    this.vndbService.getProducers().subscribe(
      x => {
        if (!x.Error && x.results) {
          this.isProducerFound = true;
        } 
        this.producerList = x.results;
        this.produceProcesser(this.producerList);
      }
    );
  }

  private produceProcesser(lst: VnProducerModel[]) {
    if(lst == null || lst.length === 0) {
      this.isProducerFound = false;
    } else {
      this.isProducerFound = true;
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
