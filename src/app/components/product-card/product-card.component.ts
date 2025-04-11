import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private router: Router) {}

  buy() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
    if (!isLoggedIn) {
      alert('⚠️ Пожалуйста, войдите в аккаунт, чтобы добавить товар 🛒');
      this.router.navigate(['/login']);
      return;
    }
  
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.id === this.product.id);
  
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...this.product, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  
    const audio = new Audio('assets/sounds/button-add-to-cart.mp3');
    audio.play();
  
    alert('🎉 Товар добавлен в корзину!');
  
    // 👇 Обновим событие вручную
    window.dispatchEvent(new Event('storage'));
  }
  
}
