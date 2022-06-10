import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectModel } from '../model/project-model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProjectModalComponent } from '../modal-components/project-modal/project-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-intro',
  templateUrl: './project-intro.component.html',
  styleUrls: ['./project-intro.component.css']
})
export class ProjectIntroComponent implements OnInit {
  pageSize: any;
  projectList: ProjectModel[] = [
    {
      id: 1,
      description: "Anime Finder",
      long_description: "This is project 1 which was created in xxx Years, and built by n Language for x Company",
      image_url: "http://localhost:4200/assets/images/demo.PNG"
    } as ProjectModel,
    {
      id: 1,
      description: "Asset Management",
      long_description: "This is project 1 which was created in xxx Years, and built by n Language for x Company",
      image_url: "http://localhost:4200/assets/images/Asset_home_1.png"
    } as ProjectModel,
    {
      id: 1,
      description: "Asset Real-Time Tracker",
      long_description: "This is project 1 which was created in xxx Years, and built by n Language for x Company",
      image_url: "http://localhost:4200/assets/images/EYE_menu.png"
    } as ProjectModel,
    {
      id: 1,
      description: "Zebra Label Printer",
      long_description: "This is project 1 which was created in xxx Years, and built by n Language for x Company",
      image_url: "http://localhost:4200/assets/images/Pricing_App.png"
    } as ProjectModel,
    {
      id: 1,
      description: "Product Management",
      long_description: "This is project 1 which was created in xxx Years, and built by n Language for x Company",
      image_url: "http://localhost:4200/assets/images/Pricing_App2.png"
    } as ProjectModel,
    {
      id: 1,
      description: "Vaccine Management",
      long_description: "This is project 1 which was created in xxx Years, and built by n Language for x Company",
      image_url: "http://localhost:4200/assets/images/VT_menu_1.png"
    } as ProjectModel,
    {
      id: 1,
      description: "Employee Internal Product Lookup",
      long_description: "This is project 1 which was created in xxx Years, and built by n Language for x Company",
      image_url: "http://localhost:4200/assets/images/Web_App1.png"
    } as ProjectModel,
    {
      id: 1,
      description: "Ecommerce Solution",
      long_description: "This is project 1 which was created in xxx Years, and built by n Language for x Company",
      image_url: "http://localhost:4200/assets/images/GF-Ecom.png"
    } as ProjectModel,
    {
      id: 1,
      description: "Internal Project Management",
      long_description: "This is project 1 which was created in xxx Years, and built by n Language for x Company",
      image_url: "http://localhost:4200/assets/images/GF-Internal.png"
    } as ProjectModel
  ];
  constructor(
    private scroller: ViewportScroller, 
    private router: Router, 
    private sanitizer:DomSanitizer,  
    private breakpointObserver: BreakpointObserver,
    public modelService: NgbModal
    ) {}
  numberOfGrid: number = 4;
  ngOnInit(): void {
    this.breakpointEvent();
  }

  breakpointEvent(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XLarge]) {
        this.numberOfGrid = 4;
      } else if (result.breakpoints[Breakpoints.Large]) {
        this.numberOfGrid = 4;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.numberOfGrid = 1;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.numberOfGrid = 1;
      } else {
        this.numberOfGrid = 1;
      }
    });
  }

  onPageChange($event) {
    let startIndex = $event.pageIndex * $event.pageSize;
    let endIndex = startIndex + $event.pageSize;
    if(endIndex > this.pageSize){
      endIndex = this.pageSize;
    }
    // this.aniListShow = this.aniList.slice(startIndex, endIndex);
  }

  openProjectModal(project: ProjectModel) {
    const modalRef = this.modelService.open(ProjectModalComponent);
    modalRef.componentInstance.project = project;

  }


}
