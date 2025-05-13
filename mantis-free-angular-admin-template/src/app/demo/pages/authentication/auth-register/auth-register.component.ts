import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/services/alert.service'; // Import AlertService for notifications

@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule], // Add ReactiveFormsModule
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent {
  form: FormGroup; // Define the form group
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService // Inject AlertService for notifications
  ) {
    // Initialize the form with validation rules
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get f() {
    return this.form.controls; // Getter for form controls
  }

  register() {

    console.log('Register function called');

    if (this.form.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const user: User = {
      name: this.form.value.name!,
      email: this.form.value.email!,
      password: this.form.value.password!,
      status: 'active'
    };

    // Call the UserService to register the user
    this.userService.addUser(user).subscribe({
      next: (res) => {
        // Show success alert
        console.log('User registered successfully:', res); 
        this.alertService.AlertSuccess('Registration Successful', 'Your account has been created successfully!');
        // Navigate to the login page
        this.router.navigate(['/login']);
        console.log('Navigation to /login successful');
      },
      error: (error) => {
        // Show error alert
        this.alertService.AlertSuccess('Registration Failed', 'An error occurred while creating your account.');
        console.error(error);
      }
    });
  }
}