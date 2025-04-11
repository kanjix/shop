// src/app/pages/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeSlideIn } from '../../animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [fadeSlideIn]
})
export class ProfileComponent implements OnInit {
  username: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser') || '';
  }

  saveChanges(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.username === localStorage.getItem('currentUser'));

    if (index !== -1) {
      if (this.newPassword && this.newPassword !== this.confirmPassword) {
        alert('❗ Пароли не совпадают');
        return;
      }

      users[index].username = this.username;
      if (this.newPassword.trim() && this.newPassword === this.confirmPassword) {
        users[index].password = this.newPassword;
      }

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', this.username);
      alert('✅ Изменения сохранены');
    } else {
      alert('⚠️ Пользователь не найден');
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    this.router.navigate(['/']);
  }
}