import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/Product';
@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  productService = inject(ProductService)
  route = inject(ActivatedRoute)
  productid!: string;

  addProduct: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
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

  handleSumit() {
    this.productService
      .editProduct(this.productid, this.addProduct.value)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}
