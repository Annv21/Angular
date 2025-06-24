import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/admin-layout/layout.component'; // layout admin
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { ProductAddComponent } from './admin/product/product-add/product-add.component';
import { ProductEditComponent } from './admin/product/product-edit/product-edit.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  // Auth routes (không cần layout)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Admin routes với layout riêng
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' }, // mặc định về list sản phẩm
      { path: 'products', component: ProductListComponent },
      { path: 'products/add', component: ProductAddComponent },
      { path: 'products/edit/:id', component: ProductEditComponent },
    ],
  },

  // Route mặc định hoặc user → sau thêm user-layout nếu muốn
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
