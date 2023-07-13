import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.class';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    const api = environment.serverUrl + '/categories';
    return this.httpClient.get(api);
  }

  addCategory(category: Category) {
    const api = environment.serverUrl + '/add/category';
    return this.httpClient.post(api, category);
  }
}
