import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private source = "/product-image";

  constructor(
    private http: HttpClient
  ) { }

  updateProductImage(productImage: any): Observable<any>{
    return this.http.post(api_dwb_uri + this.source, productImage);
  }

  getProductImages(product_id: any): Observable<any>{
    return this.http.get(api_dwb_uri + this.source + "/" + product_id);
  }

  deleteProductImage(product_id: any): Observable<any>{
    return this.http.delete(api_dwb_uri + this.source + "/" + product_id);
  }
}
