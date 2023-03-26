import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, shareReplay } from 'rxjs/operators';
import { searchList } from 'src/app/model/searchList';

@Injectable({
  providedIn: 'root'
})
export class NyaaService {

  aws_url = "https://yr8xbnhel0.execute-api.us-west-1.amazonaws.com";
  aws_env = "/Prod";
  aws_search = "/search-hapi";
  aws_episode = "/episode";
  param_name = "q=";
  param_ep = "e=";

  search_url = this.aws_url + this.aws_env + this.aws_search;
  search_url_sukebei = this.aws_url + this.aws_env + "/sukebei/search/anime";
  url;
  public respondMapAnimeEpisode = new Map<any, any>();

  constructor(private http: HttpClient) {

  }

  GetSearchNyaaSukebeiAnime(name: string)  : Observable<searchList[]> {
    var _url = this.search_url_sukebei;
    if(name != null || name != "") {
      _url = _url + "?" + this.param_name + name;
    }

    return this.http.get<searchList[]>(_url).pipe(
      map((data:any) => data), catchError(this.handleError)
    );
  }

  getSearchByName(name: any) : Observable<searchList[]> {
    var _url = this.search_url;
    if(name != null || name != "") {
      _url = _url + "?" + this.param_name + name;
    }

    return this.http.get<searchList[]>(_url).pipe(
      map((data:any) => data), catchError(this.handleError)
    );
  }

  setSearchByNameEp(name: any, episode: any){
    var _url = this.search_url;
    var tmpUrl;
    var str;
    if(name != null || name != "") {
      if (episode == -2) {
        str = name;
        tmpUrl = _url + "?" + this.param_name + name + "&" + this.param_ep + "";
      } else {
        str = name + episode;
        tmpUrl = _url + "?" + this.param_name + name + "&" + this.param_ep + episode;
      }
    }

    // return this.http.get<searchList[]>(_url).pipe(
    //   map((data:any) => data), catchError(this.handleError)
    // );

    
    this.url = tmpUrl;
    var respondData = this.http.get<searchList[]>(tmpUrl).pipe(
      map((data:any) => data), 
      shareReplay(1),
      catchError((this.handleError))
    );
    this.respondMapAnimeEpisode[str] = respondData;

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
