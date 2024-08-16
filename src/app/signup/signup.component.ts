import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = {
    email: '',
    fullName: '',
    password: ''
  };

  emailErrorMessage: string | null = null;
  fullNameErrorMessage: string | null = null;
  passwordErrorMessage: string | null = null;

  constructor(private router: Router, private userService: UserService) {
    const savedUser = this.userService.getUser();
    if (savedUser) {
      this.user = savedUser;
    }
  }

  onMailInput(){
    if (this.emailErrorMessage) {
      this.emailErrorMessage = '';
    }
  }

  onNameInput(){
    if (this.fullNameErrorMessage) {
      this.fullNameErrorMessage = '';
    }
  }

  onPasswordInput() {
    if (this.passwordErrorMessage) {
      this.passwordErrorMessage = '';
    }
  }

  onSubmit() {
    // Reset error messages

    // Reset error messages
    this.emailErrorMessage = null;
    this.fullNameErrorMessage = null;
    this.passwordErrorMessage = null;

       // Validate email
       if (!this.user.email) {
        this.emailErrorMessage = 'Email is required.';
      } else if (!this.isValidEmail(this.user.email)) {
        this.emailErrorMessage = 'Please enter a valid email.';
      }

    // Validate full name
    if (!this.user.fullName) {
      this.fullNameErrorMessage = 'Full Name is required.';
    }

     // Validate password
     if (!this.user.password) {
      this.passwordErrorMessage = 'Password is required.';
    } else if (this.user.password.length < 3) {
      this.passwordErrorMessage = 'Password must be at least 3 characters long.';
    }

    // Check if the form is valid before proceeding
    if (!this.emailErrorMessage && !this.fullNameErrorMessage && !this.passwordErrorMessage) {
      this.userService.setUser(this.user);
      console.log('Form Submitted', this.user);
      // Proceed with form submission logic
      this.router.navigate(['/next-step'], { state: { user: this.user } });
    }
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

}
