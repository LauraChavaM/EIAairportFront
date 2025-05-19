import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-login.component.html',
  standalone: true,
})
export class AuthLoginComponent {

  loginForm!: FormGroup;
  errorMessage: string | null = null;
  
  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) { }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }


 
  login() {
    const { uname, password } = this.form.value;
    this.authService.authenticate(uname || '', password || '').subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem("AuthToken", res.token);
        localStorage.setItem('username', uname || 'Guesttt');
        this.router.navigate(['/flights']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Error trying to login'; // Set the error message
      }

    })
  }
}
