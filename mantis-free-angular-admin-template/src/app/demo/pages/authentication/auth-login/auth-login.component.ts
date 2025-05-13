import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule], // Import FormsModule and RouterModule
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.authenticate(this.email, this.password).subscribe({
      next: (response) => {
        // Save the token to localStorage
        localStorage.setItem('AuthToken', response.token);
        // Redirect to the dashboard or home page
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';
        console.error(error);
      }
    });
  }
}