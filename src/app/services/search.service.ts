import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Realestate } from '../models/realState.class';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  realestates: Subject<Realestate[]> = new Subject<Realestate[]>();
  filter: BehaviorSubject<IRealestatesFilter> =
    new BehaviorSubject<IRealestatesFilter>({});
  //new
  private searchQuerySubject: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) {}

  updateFilter(newFilter: IRealestatesFilter) {
    const oldFilter = this.filter.getValue();
    this.filter.next({ ...oldFilter, ...newFilter });
  }
  resetValues() {
    this.realestates.next([]);
    this.filter.next({});
  }

  async searchRealestates() {
    const filter = this.filter.getValue();
    let queryString = '';
    if (filter) {
      if (filter.realestateName) {
        if (!queryString) {
          queryString = '?realestateName' + filter.realestateName;
        } else {
          queryString = '&realestateName' + filter.realestateName;
        }
      }

      if (filter.categoryId) {
        if (!queryString) {
          queryString = '?categoryId' + filter.categoryId;
        } else {
          queryString = '&categoryId' + filter.categoryId;
        }
      }
    }

    const api = environment.serverUrl + '/search' + queryString;
    const realestateRespons = (await this.httpClient
      .get(api)
      .toPromise()) as Realestate[];
    this.realestates.next(realestateRespons ?? []);
  }

  newsearchAllRealestates(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
    const api = environment.serverUrl + '/searchAll';
    return this.httpClient.get<any>(api, { params });
  }

  get searchQuery(): Observable<string> {
    return this.searchQuerySubject.asObservable();
  }

  updateSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }
}

export interface IRealestatesFilter {
  realestateName?: string;
  categoryId?: number;
}
