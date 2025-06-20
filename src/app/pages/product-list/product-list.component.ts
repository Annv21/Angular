import { Component, inject } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../types/Product';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productService = inject(ProductService);
  products: Product[] = [];
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
