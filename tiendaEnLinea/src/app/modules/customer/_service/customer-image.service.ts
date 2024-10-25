import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
@Injectable({
  providedIn: 'root'
})
export class CustomerImageService {
  private source = "/customer-image";
  constructor(
    private http: HttpClient
  ) { }
  updateCustomerImage(customer_image: any): Observable<any> {
    return this.http.put(api_dwb_uri + this.source, customer_image);
  }
}