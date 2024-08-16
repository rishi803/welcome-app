import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-success.component.html',
  styleUrl: './login-success.component.css'
})
export class LoginSuccessComponent {

  showModal: boolean = true;
  modalMessage: string = 'Logging In....';

  closeModal() {
    this.showModal = false;
  }
}
