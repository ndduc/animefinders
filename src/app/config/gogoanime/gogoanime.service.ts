import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { GogoAnimeSearchModel } from './model/gogoanime-search.model';

@Injectable({
  providedIn: 'root'
})
export class GogoanimeService {
  // goganime api git https://github.com/riimuru/gogoanime#get-anime-search
  gogoanime_url = 'https://gogoanime.herokuapp.com' as string;

  private searchSubject: Subject<GogoAnimeSearchModel[]>;
  public search$: Observable<GogoAnimeSearchModel[]>;


  constructor(private httpClient: HttpClient) { 
    this.searchSubject = new Subject<GogoAnimeSearchModel[]>();
    this.search$ = this.searchSubject.asObservable();
  }

  public getAnimeSearch(animeName: string): Subscription {
    return this.httpClient.get<GogoAnimeSearchModel[]>(
    `${this.gogoanime_url}/search?keyw=${animeName}`
    )
    .subscribe(x => {
      this.searchSubject.next(x);
    });  
  } 
}
