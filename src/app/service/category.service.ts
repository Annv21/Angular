import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../types/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = 'http://localhost:3000/categories';
  http = inject(HttpClient);

  getAll() {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getDetails(id: string) {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  add(data: Category) {
    return this.http.post<Category>(this.apiUrl, data);
  }

  update(id: string, data: Category) {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
