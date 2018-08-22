import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { urls } from '../../service/url';
import { HttpRequestService } from '../../service/http-request.service';
import { UserItem } from './myhttp.model';

@Injectable()
export class MyHttpService {

  constructor(
    private http: HttpClient,
    private service: HttpRequestService) { }

    searchUsers(term: string): Observable<{} | UserItem[]> {
      return this.service.doGet<UserItem[]>(urls.user.getUsersByName, {name: term});
    }

    addUsers(user: UserItem): Observable<{} | any> {
      return this.service.doPost<any>(urls.user.addUser, user);
    }

    delete (user: UserItem | number): Observable<{} | any> {
      const id = typeof user === 'number' ? user : user.id;
      return this.service.doDelete<any>(urls.user.deleteUser, {id: id});
    }

    getUser(id: string): Observable<{} | UserItem> {
      return this.service.doGet<UserItem>(urls.user.getUserByid, {id: id});
    }


    updateUser(user: UserItem): Observable<{} | any> {
      return this.service.doPost<any>(urls.user.update, user);
    }

}
