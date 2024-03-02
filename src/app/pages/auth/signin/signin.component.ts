import { Component } from '@angular/core';
import { LoginRequest } from '../models/auth.models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService
  ) {}

  onClick(): void {
    console.log(`user ${this.username} password ${this.password}`);
    var request: LoginRequest = {
      userName: this.username,
      password: this.password
    }
    this.authService.login(request)
    .subscribe({
      error: (errorMessage) => alert(errorMessage)
    });
  }
}
