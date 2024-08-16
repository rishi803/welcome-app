import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-next-step',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './next-step.component.html',
  styleUrl: './next-step.component.css'
})
export class NextStepComponent implements OnInit {
  user: any;
  organizations: { name: string, id: string }[] = [];
  orgIdError = false;

  organizationNameErrorMessage: string | null = null;
  organizationIdErrorMessage: string | null = null;
  designationErrorMessage: string | null = null;
  birthdateErrorMessage: string | null = null;
  cityErrorMessage: string | null = null;
  pincodeErrorMessage: string | null = null;


  @ViewChild('pincode') pincode!: ElementRef;

  constructor(private router: Router, private orgService: UserService) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user'] || this.orgService.getUser();;
  }

  ngOnInit() {
    this.organizationNameErrorMessage = null;
    this.organizationIdErrorMessage = null;
    this.designationErrorMessage = null;
    this.birthdateErrorMessage = null;
    this.cityErrorMessage = null;
    this.pincodeErrorMessage = null;

   // Mock data for organizations
   this.organizations = this.orgService.getOrganizations();
  }

  validateOrgId() {
    this.orgIdError = !this.organizations.some(org => org.id === this.user.organizationId);
  }

  goBack() {
    this.orgService.setUser(this.user);
    this.router.navigate(['/signup'], { state: { user: this.user } });
  }

  onInputChange(field: string) {
    switch (field) {
      case 'organizationName':
        this.organizationNameErrorMessage = null;
        break;
      case 'organizationId':
        this.organizationIdErrorMessage = null;
        break;
      case 'designation':
        this.designationErrorMessage = null;
        break;
      case 'birthdate':
        this.birthdateErrorMessage = null;
        break;
      case 'city':
        this.cityErrorMessage = null;
        break;
      case 'pincode':
        this.pincodeErrorMessage = null;
        break;
    }
  }

  onSubmit() {
    console.log(this.user);
     // Validate organization name
     if (!this.user.organizationName) {
      this.organizationNameErrorMessage = 'Organization Name is required.';
    }

    // Validate organization ID
    if (!this.user.organizationId) {
      this.organizationIdErrorMessage = 'Organization ID is required.';
    } else {
      this.validateOrgId();
    }

    // Validate designation
    if (!this.user.designation) {
      this.designationErrorMessage = 'Designation is required.';
    }

    // Validate birthdate
    if (!this.user.birthdate) {
      this.birthdateErrorMessage = 'Birthdate is required.';
    }

    // Validate city
    if (!this.user.city) {
      this.cityErrorMessage = 'City is required.';
    }

    // Validate pincode
    if (!this.user.pincode) {
      this.pincodeErrorMessage = 'Pincode is required.';
    } else if (!/^[0-9]{6}$/.test(this.user.pincode)) {
      this.pincodeErrorMessage = 'Pincode must be 6 digits.';
    }

    // Check if the form is valid before proceeding
    if (
        !this.organizationNameErrorMessage && !this.organizationIdErrorMessage &&
        !this.designationErrorMessage && !this.birthdateErrorMessage &&
        !this.cityErrorMessage && !this.pincodeErrorMessage) {
      console.log('Form Submitted', this.user);
      // Proceed with form submission logic
      this.router.navigate(['/signup-success'], { state: { user: this.user } });
    }
    // Add logic here for when the form is submitted.
  }


}
