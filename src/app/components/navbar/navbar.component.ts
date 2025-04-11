import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  currentUser = '';
  cartCount: number = 0; // 👈 добавили сюда

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLogin();
    this.updateCartCount();

    window.addEventListener('storage', () => this.updateCartCount());
  }

  checkLogin(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.currentUser = localStorage.getItem('currentUser') || '';
  }

  updateCartCount(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartCount = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
  }
  

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    this.isLoggedIn = false;
    this.cartCount = 0;
    this.router.navigate(['/']);
  }
}
