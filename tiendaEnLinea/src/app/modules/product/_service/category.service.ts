import { Injectable } from '@angular/core';
import { Category } from '../_model/category';
import { HttpClient } from '@angular/common/http';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private source = "/category";
  constructor(private http: HttpClient) { }

  createRegion(category: Category): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, category);
  }

  getCategories(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source);
  }
  
}
