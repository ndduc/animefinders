import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import {searchList} from './searchList';

@Injectable({
  providedIn: 'root'
})
export class NyaaService {

  aws_url = "https://yr8xbnhel0.execute-api.us-west-1.amazonaws.com";
  aws_env = "/Prod";
  aws_search = "/search";
  aws_episode = "/episode";
  param_name = "q=";
  param_ep = "e=";

  search_url = this.aws_url + this.aws_env + this.aws_search;

  constructor(private http: HttpClient) {

  }


  getSearchByName(name: any) : Observable<searchList[]> {
    // return this.http.get<searchList[]>
    var _url = this.search_url;
    if(name != null || name != "") {
      _url = _url + "?" + this.param_name + name;
    }

    return this.http.get<searchList[]>(_url).pipe(
      map((data:any) => data), catchError(this.handleError)
    );

  }

  getSearchByNameEp(name: any, episode: any) : Observable<searchList[]> {
    var _url = this.search_url;
    if(name != null || name != "") {
      _url = _url + "?" + this.param_name + name + "&" + this.param_ep + episode;
    }

    return this.http.get<searchList[]>(_url).pipe(
      map((data:any) => data), catchError(this.handleError)
    );

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
