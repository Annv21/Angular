import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import { inject } from '@angular/core';
@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  productService = inject(ProductService)

  addProduct: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    isShow: new FormControl(''),
  });

  handleSumit() {
    this.productService.add(this.addProduct.value).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
