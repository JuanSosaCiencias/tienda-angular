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
}
