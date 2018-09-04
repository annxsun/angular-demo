import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject } from '../../../node_modules/rxjs';
import { catchError, map, tap, filter, mergeMap} from 'rxjs/operators';
import { transformPanel } from '@angular/material';

@Injectable()
export class HttpRequestService {

    /**当前登录用的token */
    private token = '';

    constructor(private http: HttpClient) {

    }

    /** get */
    public doGet<T>(url: string, placeholder?: object): Observable<T> {
        if (placeholder != null) {
            url = this.transUrl(url, placeholder);
        }
        return this.http.get<T>(url, this.getJsonHeaders()).pipe(
            catchError(err => this.handleError<T>(err))
        );
    }

    /** post */
    public doPost<T>(url: string, ...rest: any[]):  Observable<T> {
        let body = rest.length === 1 ? rest[0] : rest[1];
        let placeholder = rest.length === 2 ? rest[0] : null;
        let isFormData = body instanceof FormData;
        let headersOptions = isFormData ? this.getDataHeaders() : this.getJsonHeaders();
        body = isFormData ? body : JSON.stringify(body);
        if (placeholder != null) {
            url = this.transUrl(url, placeholder);
        }
        return this.http.post<T>(url, body, headersOptions).pipe(
            catchError(err => this.handleError<T>(err))
        );
    }

 
    /** put */
    public doPut<T>(url: string, ...rest: any[]):  Observable<T> {
        let body = rest.length === 1 ? rest[0] : rest[1];
        let placeholder = rest.length === 2 ? rest[0] : null;
        if (placeholder != null) {
            url = this.transUrl(url, placeholder);
        }

        return this.http.put<T>(url, body, this.getJsonHeaders()).pipe(
            catchError(err => this.handleError<T>(err))
        );
    }

    /** delete */
    public doDelete<T>(url: string, placeholder?: object):  Observable<T> {
        if (placeholder != null) {
            url = this.transUrl(url, placeholder);
        }
        return this.http.delete<T>(url, this.getJsonHeaders()).pipe(
            catchError(err => this.handleError<T>(err))
        );
    }

    /** 错误捕获 */
    private handleError<T>(error: HttpErrorResponse) {
            if (error.status === 401) {
                window.sessionStorage.clear();
                window.location.href  = '/';
            }
            console.log('error', error);
            return of(error as any);
    }

    /**转换需要值替换的url */
    private transUrl(url: string, obj: object): string {
        return url.replace(/{(\w+)}/g, function (origin: string, match: string, index: number) {
            return obj[match];
        });
    }


    /** application/json */
    public getJsonHeaders() {
        return {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token})};
    }

    /** formData */
    public getDataHeaders() {
        return {headers: new HttpHeaders({'Authorization': this.token })};
    }
}