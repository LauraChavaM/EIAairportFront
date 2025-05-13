import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf


@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],  // Import RouterModule here
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent {
  user: User = {
    name: '',
    email: '',
    password: '',
    status: 'active'
  };
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.addUser(this.user).subscribe({
      next: () => {
        // Redirect to the login page after successful registration
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error(error);
      }
    });
  }
}