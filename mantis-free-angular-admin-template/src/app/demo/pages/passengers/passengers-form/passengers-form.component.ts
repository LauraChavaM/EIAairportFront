import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassengerService } from 'src/app/services/passenger/passenger.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-passengers-form',
  templateUrl: './passengers-form.component.html',
  styleUrls: ['./passengers-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PassengersFormComponent implements OnInit {
  passengerForm!: FormGroup;
  isEditMode = false;
  passengerId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private passengerService: PassengerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.passengerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passportNumber: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.passengerId = this.route.snapshot.paramMap.get('id');
    if (this.passengerId) {
      this.isEditMode = true;
      this.passengerService.getPassengerById(this.passengerId).subscribe(passenger => {
        this.passengerForm.patchValue(passenger);
      });
    }
  }

  onSubmit() {
    if (this.passengerForm.invalid) return;

    if (this.isEditMode && this.passengerId) {
      this.passengerService.updatePassenger(this.passengerId, this.passengerForm.value).subscribe(() => {
        this.router.navigate(['/passengers/list']);
      });
    } else {
      this.passengerService.addPassenger(this.passengerForm.value).subscribe(() => {
        this.router.navigate(['/passengers/list']);
      });
    }
  }
}