import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from 'src/app/services/flight/flight.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class FlightFormComponent implements OnInit {
  flightForm!: FormGroup;
  isEditMode = false;
  flightId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      airline: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departure_time: ['', Validators.required],
      arrival_time: ['', Validators.required],
      departure_gate: [''],
      arrival_gate: [''],
      status: ['', Validators.required]
    });

    this.flightId = this.route.snapshot.paramMap.get('id');
    if (this.flightId) {
      this.isEditMode = true;
      this.flightService.getFlightById(this.flightId).subscribe(flight => {
        // Add flight_number to the form only in edit mode for display
      this.flightForm.addControl('flight_number', this.fb.control({ value: flight.flight_number, disabled: true }));
      this.flightForm.patchValue(flight);
      });
    }
  }

  onSubmit() {
    if (this.flightForm.invalid) return;

    if (this.isEditMode && this.flightId) {
      this.flightService.updateFlight(this.flightId, this.flightForm.value).subscribe(() => {
        this.router.navigate(['/flights/list']);
      });
    } else {
      this.flightService.createFlight(this.flightForm.value).subscribe(() => {
        this.router.navigate(['/flights/list']);
      });
    }
  }
}