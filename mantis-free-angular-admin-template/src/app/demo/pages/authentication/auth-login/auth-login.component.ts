import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-login.component.html',
})
export class AuthLoginComponent {

  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  login() {
    const { uname, password } = this.form.value;
    this.authService.authenticate(uname || '', password || '').subscribe({
      next: (res) => {
        localStorage.setItem("AuthToken", res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Error trying to login'; // Set the error message
      }

    })
  }
}
