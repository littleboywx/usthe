import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {ResponseVO} from '../pojo/ResponseVO';
import {environment} from '../../environments/environment';

@Injectable()
export class HttpUtil {

  private baseUrl: string;

  constructor( private http: HttpClient) {
    this.baseUrl = environment.apiBaseUrl;
  }

  public post(url: string, param?: any): Observable<ResponseVO> {
    const uri = this.baseUrl + url;
    return this.http.post<ResponseVO>(uri, param).pipe(
      catchError(this.handleError)
    );

  }

  public get(url: string): Observable<ResponseVO> {
    const uri = this.baseUrl + url;
    return this.http.get<ResponseVO>(uri).pipe(
      catchError(this.handleError)
    );
  }

  public put(url: string, params?: any): Observable<ResponseVO> {
    const uri = this.baseUrl + url;
    return this.http.put<ResponseVO>(uri, params).pipe(
      catchError(this.handleError)
    );
  }

  public patch(url: string, params?: any): Observable<ResponseVO> {
    const uri = this.baseUrl + url;
    return this.http.patch<ResponseVO>(uri, params).pipe(
      catchError(this.handleError)
    );
  }

  public delete(url: string, params?: any): Observable <ResponseVO> {
    const uri = this.baseUrl + url;
    return this.http.delete<ResponseVO>(uri, params).pipe(
      catchError(this.handleError)
    );
  }

  private fillHeaders(headers: HttpHeaders) {
    const uid = localStorage.getItem('uid');
    if (uid != null) {
      headers.append('uid', uid);
    }
    const jwt = localStorage.getItem('jwt');
    if (jwt != null) {
      headers.append('jwt', jwt);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error( `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return new ErrorObservable('亲请检查网络');

  }
}
