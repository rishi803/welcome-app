import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup-success.component.html',
  styleUrl: './signup-success.component.css'
})
export class SignupSuccessComponent {
  showModal: boolean = true;
  modalMessage: string = 'Logging In....';

  closeModal() {
    this.showModal = false;
  }
}
