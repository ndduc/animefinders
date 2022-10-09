import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, timeout, shareReplay} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  qa_url_aws = 'https://4t811sgdnl.execute-api.us-west-1.amazonaws.com/Dev/qa';
  constructor(private http: HttpClient) { }
  question: any;

  addQuestion(question: any): Observable<any> {
      return this.http.post(this.qa_url_aws, {"question":question}).pipe(
      map((data:any) => data), 
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
}