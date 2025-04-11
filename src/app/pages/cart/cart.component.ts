import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  address: string = '';

  ngOnInit() {
    const rawCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart = rawCart.map((item: any) => ({ ...item, quantity: item.quantity || 1 }));
  }

  get totalItems(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.saveCart();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.cart = this.cart.filter(p => p !== item);
    }
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  checkout() {
    if (!this.address.trim()) {
      alert('❗ Введите адрес доставки.');
      return;
    }
    alert(`✅ Спасибо за покупку! Ваш заказ доставят по адресу: ${this.address}`);
    this.cart = [];
    this.address = '';
    localStorage.removeItem('cart');
  }
}