import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { MOCK_PRODUCTS } from '../models/mock-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(MOCK_PRODUCTS);
  }
}
