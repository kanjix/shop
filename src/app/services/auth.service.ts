import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: string = '';
  private loggedIn: boolean = false;

  constructor(private router: Router) {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.currentUser = localStorage.getItem('currentUser') || '';
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  getUser(): string {
    return this.currentUser;
  }

  login(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
      this.loggedIn = true;
      this.currentUser = username;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', username);
      return true;
    }

    return false;
  }

  register(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find((u: any) => u.username === username);
    if (exists) return false;

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  logout() {
    this.loggedIn = false;
    this.currentUser = '';
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']).then(() => window.location.reload());
  }
}
