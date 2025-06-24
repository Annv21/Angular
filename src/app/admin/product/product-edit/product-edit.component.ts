import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { CategoryService } from '../../../service/category.service';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../types/Category';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  productService = inject(ProductService)
  categoryService = inject(CategoryService)
  route = inject(ActivatedRoute)
  router = inject(Router)
  categories: Category[] = [];
  productid!: string;

  addProduct: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required, Validators.min(0)]),
    category: new FormControl('',[Validators.required]),
    isShow: new FormControl(''),
  });


ngOnInit() {
  this.route.params.subscribe((param) => {
    this.productid = param['id'];
    this.productService.getDetails(param['id']).subscribe({
      next: (data) => {
        this.addProduct.patchValue(data);
       },
      error: (err) => {
        console.log(err);
      }
    })
  })
}

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
    this.productService
      .editProduct(this.productid, this.addProduct.value)
      .subscribe({
        next: (data) => {
          console.log(data);
          alert('Cập nhật thành công');
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}
