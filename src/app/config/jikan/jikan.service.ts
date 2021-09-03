import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, timeout, shareReplay} from 'rxjs/operators';
import { AniList } from './animelist';
import { AniEpisodesList } from './animeEpisodes';
import { AniDetail } from './animeDetail';
import { AniTop } from './animeTop';

@Injectable({
  providedIn: 'root'
})


export class JikanService {
 // jikan_url = 'https://api.jikan.moe/v3';
  jikan_url_aws = 'https://yr8xbnhel0.execute-api.us-west-1.amazonaws.com/Prod/jikan';
  qa_url_aws = 'https://yr8xbnhel0.execute-api.us-west-1.amazonaws.com/Prod/qa';
  url;
  public respondMap = new Map<string, any>();
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
    this.respondMap[this.url] = respondData;
  }

  
  setTopAnime(page: string, subtype: string) {
    //   if(subtype.length <= 1) {
    //     subtype = "";
    //   }
    //   return this.http.get<AniList[]>(this.jikan_url_aws + "/anime/top?page=" + page + "&subtype=" + subtype).pipe(
    //   map((data:any) => data.top), 
    //   catchError(this.handleError)
    // );


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
    this.respondMap[this.url] = respondData;
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
    this.respondMap[this.url] = respondData;
  }



  private handleError(error: HttpErrorResponse) {
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
