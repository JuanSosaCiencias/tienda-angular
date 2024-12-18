import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { tap } from 'rxjs/operators';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private source = "/invoice";
  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) { }
  getInvoice(id: number): Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/" + id);
  }
  getInvoices(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source);
  }
  generateInvoice(): Observable<any>{
    return this.http.post(api_dwb_uri + this.source, {}).pipe(
      tap(() => this.cartService.resetCount()) // Reinicia el contador
    );
  }
}