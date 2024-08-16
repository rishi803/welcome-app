// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoginRequest } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[FormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  userName: string | null = null;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.userName = this.userService.getUserNameByEmail(this.email);
    });
  }

  onSubmit() {
    if (!this.password) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    if (this.userService.validatePassword(this.email, this.password)) {
      this.router.navigate(['/login-success']);
    } else {
      this.errorMessage = 'Incorrect password. Please try again.';
    }
  }

  onPasswordInput() {
    if (this.errorMessage) {
      this.errorMessage = '';
    }
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

}
