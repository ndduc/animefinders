import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, timeout } from 'rxjs/operators';
import { AniList } from './animelist';
import { AniEpisodesList } from './animeEpisodes';
import { AniDetail } from './animeDetail';

@Injectable({
  providedIn: 'root'
})


export class JikanService {
 // jikan_url = 'https://api.jikan.moe/v3';
  jikan_url_aws = 'https://yr8xbnhel0.execute-api.us-west-1.amazonaws.com/Prod/jikan';

  constructor(private http: HttpClient) { }


  getSeasonalAnime(): Observable<AniList[]> {
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth() - 1;
    // return this.http.get<AniList[]>(this.jikan_url + "/season/" + currentYear + "/" + this.getCurrentSeason(currentMonth)).pipe(
    //   map((data:any) => data.anime), 
    //   catchError(this.handleError)
    // );
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

  getAnimeEpisodes(animeId: any) : Observable<AniEpisodesList[]> {
    var _animeId = -1;
    if(animeId != null || animeId >= 0) {
      _animeId = animeId;
    }
    var url = this.jikan_url_aws + "/anime/episode?animeid=" + _animeId;
    return this.http.get<AniEpisodesList[]>(url).pipe(
      map((data:any) => data.episodes), 
      catchError((this.handleError))
    );
  }

  getAnimeDetail(animeId: any) : Observable<AniDetail> {
    var _animeId = -1;
    if(animeId != null || animeId >= 0) {
      _animeId = animeId;
    }
    var url = this.jikan_url_aws + "/anime/detail?animeid=" + _animeId;
    return this.http.get<AniDetail>(url).pipe(
      map((data:any) => data), 
      catchError((this.handleError))
    );
  }

  getAnimeBySeasonYear(season: any, year: any): Observable<AniList[]> {
    var _season = "";
    var _year = "";
    if(season != null || season != "") {
      _season = season;
    }

    if (year != null || year != "") {
      _year = year
    }

    //var url = this.jikan_url + "/season/" + _year + _season;
    var url = this.jikan_url_aws + "/seasonal?year=" + _year + "&season=" + _season;
    return this.http.get<AniList[]>(url).pipe(
      map((data:any) => data.anime), 
      catchError((this.handleError))
    );
  }

  getAnimeByTitle(title: any):Observable<AniList[]> {
    var _title = "";
    if(title != null || title != "") {
      _title = title
    }
    // var url = this.jikan_url + "/search/anime?q=" + _title;
    // return this.http.get<AniList[]>(url).pipe(
    //   map((data:any) => data.results)
    // )
    var url = this.jikan_url_aws + "/search?title=" + _title;
    return this.http.get<AniList[]>(url).pipe(
      map((data:any) => data.results)
    )
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
