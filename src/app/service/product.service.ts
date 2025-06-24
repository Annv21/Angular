import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../types/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://localhost:3000/products';
  http = inject(HttpClient);

  getAll() {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getDetails(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  add(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  editProduct(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}