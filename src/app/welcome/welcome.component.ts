import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  title="welcome-app";
  email: string = '';
  phone: string = '';
  errorMessage: string = '';

  //for routingnavigate we are using router:Router

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
  
    if (!this.email && !this.phone) {
      this.errorMessage = 'Please enter either email or phone number.';
      return;
    }

    // Validate email
    if (this.email && !this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email.';
      return;
    }

    if (this.userService.userExists(this.email, this.phone)) {
      alert("User already exists. Let's go to Login Page.... ")
      this.router.navigate(['/login'], { queryParams: { email: this.email } });
    } else {
      alert("User does not exists. Let's go to SignUp Page.... ")
      this.router.navigateByUrl('/signup');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

}
