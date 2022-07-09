import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { GogoAnimeDetailModel } from './model/gogoanime-detail.model';
import { GogoAnimeSearchModel } from './model/gogoanime-search.model';
import { GogoAnimeStreamSBModel } from './model/gogoanime-stream-sb.model';
import { GogoAnimeStreamVIDCDNModel } from './model/gogoanime-stream-vidcdn.model';

@Injectable({
  providedIn: 'root'
})
export class GogoanimeService {
  // goganime api git https://github.com/riimuru/gogoanime#get-anime-search
  gogoanime_url = 'https://gogoanime.herokuapp.com' as string;

  private searchSubject: Subject<GogoAnimeSearchModel[]>;
  public search$: Observable<GogoAnimeSearchModel[]>;

  private detailSubject: Subject<GogoAnimeDetailModel>;
  public detail$: Observable<GogoAnimeDetailModel>;

  private streamVIDCDNSubject: Subject<GogoAnimeStreamVIDCDNModel>;
  public streamVIDCDN$: Observable<GogoAnimeStreamVIDCDNModel>;

  public streamSBSubject: Subject<GogoAnimeStreamSBModel>;
  public streamSB$: Observable<GogoAnimeStreamSBModel>;

  constructor(private httpClient: HttpClient) { 
    this.searchSubject = new Subject<GogoAnimeSearchModel[]>();
    this.search$ = this.searchSubject.asObservable();
    this.detailSubject = new Subject<GogoAnimeDetailModel>();
    this.detail$ = this.detailSubject.asObservable();
    this.streamVIDCDNSubject = new Subject<GogoAnimeStreamVIDCDNModel>();
    this.streamVIDCDN$ = this.streamVIDCDNSubject.asObservable();
    this.streamSBSubject = new Subject<GogoAnimeStreamSBModel>();
    this.streamSB$ = this.streamSBSubject.asObservable();
  }

  public getAnimeSearch(animeName: string): Subscription {
    return this.httpClient.get<GogoAnimeSearchModel[]>(
    `${this.gogoanime_url}/search?keyw=${animeName}`
    )
    .subscribe(x => {
      this.searchSubject.next(x);
    });  
  } 

  public getAnimeDetail(animeId: string): Subscription {
    return this.httpClient.get<GogoAnimeDetailModel>(
      `${this.gogoanime_url}/anime-details/${animeId}`
      )
      .subscribe(x => {
        this.detailSubject.next(x);
      });  
  }

  public getStreamVIDCDN(episodeId: string) {
    return this.httpClient.get<GogoAnimeStreamVIDCDNModel>(
      `${this.gogoanime_url}/vidcdn/watch/${episodeId}`
      )
      .subscribe(x => {
        this.streamVIDCDNSubject.next(x);
      });  
  }

  public getStreamSB(episodeId: string) {
    return this.httpClient.get<GogoAnimeStreamSBModel>(
      `${this.gogoanime_url}/streamsb/watch/${episodeId}`
      )
      .subscribe(x => {
        this.streamSBSubject.next(x);
      });  
  }
}
