import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, timeout, shareReplay} from 'rxjs/operators';
import { AniList } from './model/animelist.models';
import { AniEpisodesList } from './model/animeEpisodes.model';
import { AniDetail } from './model/animeDetail.model';
import { AniTop } from './model/animeTop.model';
import { HentaiTop } from './model/animeTop.model';
import { CacheModel } from './model/cache-model.model';
@Injectable({
  providedIn: 'root'
})


export class JikanService {
  jikan_url_aws = 'https://yr8xbnhel0.execute-api.us-west-1.amazonaws.com/Prod/jikan' as string;
  qa_url_aws = 'https://yr8xbnhel0.execute-api.us-west-1.amazonaws.com/Prod/qa' as string;
  url: string | undefined;
  error = false as boolean;
  public respondCachedModel = [] as CacheModel[];

  public respondMapAnimeDetail = new Map<any, any>();
  constructor(private http: HttpClient) { }



  addQuestion(question: any): Observable<any> {
    var body = { question: question };
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth() - 1;
      return this.http.post<any>(this.qa_url_aws, body).pipe(
      map((data:any) => data), 
      catchError(this.handleError)
    );
  }


  getSeasonalAnime(): Observable<AniList[]> {
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth() - 1;
      return this.http.get<AniList[]>(this.jikan_url_aws + "/seasonal?year=" + currentYear + "&season=" + this.getCurrentSeason(currentMonth)).pipe(
      map((data:any) => data.anime), 
      catchError(this.handleError)
    );
  }


  getCurrentSeason(month: number) {
    //January-March, April-June, July-September, October-December
    if(month >= 1 && month <= 3 ) {
      return "spring";
    } else if (month >= 4 && month <= 6) {
      return "summer";
    } else if (month >= 7 && month <= 9) {
      return "fall";
    } else {
      return "winter";
    }
  }

  setAnimeDetail(animeId: any) {
    var _animeId = -1;
    if(animeId != null || animeId >= 0) {
      _animeId = animeId;
    }
    var tmpUrl = this.jikan_url_aws + "/anime/detail?animeid=" + _animeId;
    this.url = tmpUrl;
    var respondData = this.http.get<AniDetail[]>(tmpUrl).pipe(
      map((data:any) => data), 
      shareReplay(1),
      catchError((this.handleError))
    );
    this.respondMapAnimeDetail[animeId] = respondData;

  }

  setAnimeBySeasonYear(season: any, year: any) {
    var _season = "";
    var _year = "";
    if(season != null || season != "") {
      _season = season;
    }

    if (year != null || year != "") {
      _year = year
    }
    var tmpUrl = this.jikan_url_aws + "/seasonal?year=" + _year + "&season=" + _season;
    this.url = tmpUrl;
    var respondData = this.http.get<AniList[]>(tmpUrl).pipe(
      map(
        (data:any) => 
        {
          return data.anime;
        }), 
      shareReplay(1),
      catchError((this.handleError))
    );
    this.respondCachedModel.push(
      {
        url: this.url,
        data: respondData
      } as CacheModel
    );
  }

  resetCache() {
    // reset cache object whenever if contain more than x records
    if (this.respondCachedModel.length > 6) {
      this.respondCachedModel = [] as CacheModel[];
    }
  }
  
  setTopAnime(page: string, subtype: string) {
    if(subtype.length <= 1) {
      subtype = "";
    }
    var tmpUrl = this.jikan_url_aws + "/anime/top?page=" + page + "&subtype=" + subtype;
    this.url = tmpUrl;
    var respondData = this.http.get<AniTop[]>(tmpUrl).pipe(
      map(
        (data:any) => 
        {
          return data.top;
        }), 
      shareReplay(1),
      catchError((this.handleError))
    );
    this.respondCachedModel.push(
      {
        url: this.url,
        data: respondData
      } as CacheModel
    );
  }


  setTopHentai(page: string) {
    var tmpUrl = this.jikan_url_aws + "/hentai/top?page=" + page;
    this.url = tmpUrl;
    var respondData = this.http.get<HentaiTop[]>(tmpUrl).pipe(
      map(
        (data:any) => 
        {
          return data.results;
        }), 
      shareReplay(1),
      catchError((this.handleError))
    );
    this.respondCachedModel.push(
      {
        url: this.url,
        data: respondData
      } as CacheModel
    );
  }

  setAnimeByTitle(title: any) {
    var _title = "";
    if(title != null || title != "") {
      _title = title
    }
    var tmpUrl = this.jikan_url_aws + "/search?title=" + _title;
    this.url = tmpUrl;
    var respondData = this.http.get<AniList[]>(tmpUrl).pipe(
      map((data:any) => data.results), 
      shareReplay(1),
      catchError((this.handleError))
    );
    this.respondCachedModel.push(
      {
        url: this.url,
        data: respondData
      } as CacheModel
    );
  }



  private handleError(error: HttpErrorResponse) {
    location.reload();
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
    }
}
