import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private source = "/cart";
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient
  ) { 
    this.loadCartItemCount();
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  resetCount(): void {
    this.cartItemCount.next(0);
  }

  private loadCartItemCount() {
    this.getCart().subscribe(carts => {
      const itemCount = carts.reduce((sum: number, cart: any) => sum + cart.quantity, 0);
      this.cartItemCount.next(itemCount);
    });
  }

  addToCart(cart: any): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, cart).pipe(
      tap(() => this.loadCartItemCount())
    );
  }

  getCart(): Observable<any>{
    return this.http.get(api_dwb_uri + this.source);
  }

  deleteCart(): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source).pipe(
      tap(() => this.cartItemCount.next(0)) // Reinicia el contador
    );
  }

  removeFromCart(id: number): Observable<any> {
    return this.http.delete(api_dwb_uri + this.source + "/" + id).pipe(
      tap(() => this.loadCartItemCount())
    );
  }
}