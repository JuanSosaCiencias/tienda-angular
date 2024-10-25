import { Injectable } from '@angular/core';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private source = "/customer";
  constructor(
    private http: HttpClient
  ) { }
  enableCustomer(id: number): Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + id + "/activate", null);
  }
  disableCustomer(id: number): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source + "/" + id);
  }
  getCustomer(rfc: string): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/" + rfc);
  }
  getCustomers(): Observable<any>{
    return this.http.get(api_dwb_uri + this.source);
  }
}