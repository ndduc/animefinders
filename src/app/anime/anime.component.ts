import { Component, OnInit } from '@angular/core';
import { NyaaService } from '../config/nyaaaws/nyaa.service';
import { searchList } from '../config/nyaaaws/searchList';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  providers: [NyaaService],
  styleUrls: ['./anime.component.css']
})
export class AnimeComponent implements OnInit {

  param_name:string = "";
  param_ep: string = "";
  searchList : searchList[] = [];
  constructor(private nyaaService : NyaaService) { }

  ngOnInit(): void {
  }

  getSearch(name: any, ep: any) {
    if(ep != null) {
      this.nyaaService.getSearchByName(name).subscribe(searchList => {
        this.searchList = searchList;
      });
    } else {
      this.nyaaService.getSearchByNameEp(name, ep).subscribe(searchList => {
        this.searchList = searchList;
      });
    }
  }
  
}
