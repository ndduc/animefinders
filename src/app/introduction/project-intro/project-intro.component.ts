import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectModel } from '../model/project-model';

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
  constructor(private scroller: ViewportScroller, private router: Router, private sanitizer:DomSanitizer) {}
  
  ngOnInit(): void {
  }

  onPageChange($event) {
    let startIndex = $event.pageIndex * $event.pageSize;
    let endIndex = startIndex + $event.pageSize;
    if(endIndex > this.pageSize){
      endIndex = this.pageSize;
    }
    // this.aniListShow = this.aniList.slice(startIndex, endIndex);
  }


}
