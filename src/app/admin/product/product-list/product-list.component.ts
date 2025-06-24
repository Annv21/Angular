import { Component, inject } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { CategoryService } from '../../../service/category.service';
import { Product } from '../../../types/Product';
import { RouterLink } from '@angular/router';
import { CommonModule ,CurrencyPipe} from '@angular/common';
import { Category } from '../../../types/Category';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  products: Product[] = [];
  categories: Category[] = [];
  constructor() {
    this.loadData();
  }

  loadData() {
    this.categoryService.getAll().subscribe({
      
      next: (cats) => {
        this.categories = cats;
        this.productService.getAll().subscribe({
          next: (products) => (this.products = products)
          
        });
      }
    });
  }

  getCategoryName(categoryId: string): string {
    return this.categories.find((c) => c.id === categoryId)?.name || 'N/A';
  }


  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  handleDelete(id: string) {
    if (window.confirm("Do you want to delete this product?")) {
      this.productService.deleteProduct(id).subscribe({
        next: (data) => {
          console.log(data);
          this.products = this.products.filter((product) => product.id !== id);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

  }

  
  
}
