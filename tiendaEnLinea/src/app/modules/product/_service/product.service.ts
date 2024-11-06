import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private source = "/product";
  constructor(
    private http: HttpClient
  ) { }
  createProduct(product: any): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, product);
  }
  enableProduct(id: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + id + "/activate", null);
  }
  disableProduct(id: number): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source + "/" + id);
  }
  getProduct(gtin: string): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/" + gtin);
  }
  getProducts(): Observable<any>{
    return this.http.get(api_dwb_uri + this.source);
  }
  getActiveProducts(): Observable<any>{
    return this.http.get(api_dwb_uri + this.source + "/active");
  }
  getProductsByCategory(category_id: number): Observable<any>{
    return this.http.get(api_dwb_uri + this.source + "/category" + "/" + category_id);
  }
  updateProduct(product: any, id: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + id, product);
  }
  updateProductStock(gtin: string, stock: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + gtin + "/stock"+ "/" + stock, null);
  }
}