import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class AdminLayoutComponent {
  constructor(private router: Router) {}

  logout() {
    // Xóa token, session,... nếu có
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
