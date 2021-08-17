import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NyaaService } from 'src/app/config/nyaaaws/nyaa.service';
import { searchList } from 'src/app/config/nyaaaws/searchList';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-anime-torrent-holder',
  templateUrl: './anime-torrent-holder.component.html',
  styleUrls: ['./anime-torrent-holder.component.css'],
  providers: [NyaaService]
})
export class AnimeTorrentHolderComponent implements OnInit {

  @Input() title;
  @Input() episode;
  searchList : searchList[] = [];
  constructor(private nyaaService : NyaaService, private deviceService: DeviceDetectorService) { }

  isLoading: boolean = true;
  isFound: boolean = false;

  deviceInfo;
  screen: number = 0;

  ngOnInit(): void {
    this.screenDetector();
  }

  screenDetector() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if(isMobile) {
      this.screen = 1;
    } else if (isTablet) {
      this.screen = 2;
    } else {
      this.screen = 0;
    }

  }

  getSearch(name: string, ep: number) {
    if(ep <= -1) {
      this.nyaaService.getSearchByName(name).subscribe(
        searchList => {
        this.setSearchList(searchList);
        },
        (error) => {
          this.setSearchList(this.searchList);
        }
      );
    } else {
      this.nyaaService.getSearchByNameEp(name, ep).subscribe(searchList => {
        this.setSearchList(searchList);
        },
        (error)=> {
          this.setSearchList(this.searchList);
        });
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

}
