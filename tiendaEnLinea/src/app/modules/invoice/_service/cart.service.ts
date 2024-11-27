import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private source = "/cart";
  constructor(
    private http: HttpClient
  ) { }
  addToCart(cart: any): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, cart);
  }
  getCart(): Observable<any>{
    return this.http.get(api_dwb_uri + this.source);
  }

  deleteCart(): Observable<any>{
    return this.http.delete(api_dwb_uri + this.source);
  }

  removeFromCart(id: number): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source + "/" + id);
  }
}