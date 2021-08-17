import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Search } from './search';
export interface Config {
  url1: string;
  textfile: string;
  date: any;
}



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = 'assets/config.json';
  url = 'https://2nkgq843f3.execute-api.us-west-1.amazonaws.com/Prod/safebox/nyaa/search';
  constructor(private http: HttpClient) { }
  
  getConfig() {
    return this.http.get<any>(this.url)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  
  getConfig_1() {
    return this.http.get<any>(this.url);
  }

  getConfig_2() {
    // now returns an Observable of Config
    return this.http.get<any>(this.url);
  }

  getConfig_3() {
    return this.http.get<any>(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' });
  }

  getNyaaSearch(): Observable<Search[]> {
    return this.http.get<Search[]>(this.url)
      .pipe(
        map((data: any)=> data.torrents),
        catchError(this.handleError)
      );
  }

  getNyaaSearchAny(): Observable<any> {
    return this.http.get<any>(this.url)
      .pipe(
        map((data: any)=> data.result ),
        catchError(this.handleError)
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

  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError)
      );
  }
}
