import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { CategoryService } from '../../../service/category.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../types/Category';
@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  productService = inject(ProductService)
  categoryService = inject(CategoryService)

  router = inject(Router)
  categories: Category[] = [];


  addProduct: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required, Validators.min(0)]),
    category: new FormControl('',[Validators.required]),
    isShow: new FormControl(''),
  });

  constructor() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error(err)
    });
  }
  handleSumit() {
    this.productService.add(this.addProduct.value).subscribe({
      next: (data) => {
        console.log(data);
        alert('Thêm thành công');
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

 
}

