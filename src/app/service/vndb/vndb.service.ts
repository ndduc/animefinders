import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, timeout, shareReplay, tap} from 'rxjs/operators';
import { AniDetail } from 'src/app/model/animeDetail.model';
import { AnimeListWithPagination } from 'src/app/model/animelist.models';
import { HentaiTop } from 'src/app/model/animeTop.model';
import { CacheModel } from 'src/app/model/cache-model.model';
import { VnSearchResultModel } from 'src/app/model/vn-search-result.model';
import { VnDetailResultModel } from 'src/app/model/vn-detail-result.model';


@Injectable({
  providedIn: 'root'
})


export class VndbService {
  vndb_url_aws = 'https://yr8xbnhel0.execute-api.us-west-1.amazonaws.com/Prod/vn' as string;
  url: string | undefined;
  error = false as boolean;
  public respondCachedModel = [] as CacheModel[];

  public respondMapAnimeDetail = new Map<any, any>();
  constructor(private http: HttpClient) { }


  getVnByPopularity(): Observable<VnSearchResultModel> {
      return this.http.post<VnSearchResultModel>(this.vndb_url_aws + "/search-by-popularity", {}).pipe(
      map(
        (results:VnSearchResultModel) => results
      ), 
      catchError(this.handleError)
    );
  }

  getVnDetailById(id: string) : Observable<VnDetailResultModel> {
    return this.http.post<VnDetailResultModel>(this.vndb_url_aws + "/search-by-id", {
      "filters" : ["id", "=", id]
    }).pipe(
      map(
        (results:VnDetailResultModel) => results
      ), 
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
   // location.reload();
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
