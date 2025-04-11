import { Component } from '@angular/core';
import { Router } from '@angular/router';import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const valid = /^[a-zA-Z0-9]+$/;
    if (!valid.test(this.username) || !valid.test(this.password)) {
      this.error = '⚠️ Логин и пароль должны быть на латинице';
      return;
    }

    if (this.authService.register(this.username, this.password)) {
      alert('🎉 Поздравляем с регистрацией!');
      this.router.navigate(['/login']);
    } else {
      this.error = 'Такой пользователь уже существует';
    }
  }
}
