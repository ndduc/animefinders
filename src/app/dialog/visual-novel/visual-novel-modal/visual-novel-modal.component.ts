import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VndbService } from 'src/app/service/vndb/vndb.service';

@Component({
  selector: 'app-visual-novel-modal',
  templateUrl: './visual-novel-modal.component.html',
  styleUrls: ['./visual-novel-modal.component.css']
})
export class VisualNovelModalComponent implements OnInit {

  @Input() id;

  isLoading : boolean = false;
  isDetailFound: boolean = false;
  isMobile: boolean = false;

  constructor(
    private vndbService: VndbService,
    private breakpointObserver: BreakpointObserver,
    public activeModal: NgbActiveModal, 
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.breakpointObserverEvent();
    this.getVnDetailById();
  }

  getVnDetailById() {
    console.log(this.id);
    this.vndbService.getVnDetailById(this.id).subscribe(x => {
      console.log(x);
    });
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

}
