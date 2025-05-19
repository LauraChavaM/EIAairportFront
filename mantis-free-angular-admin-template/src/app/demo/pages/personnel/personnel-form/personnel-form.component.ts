import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-personnel-form',
  templateUrl: './personnel-form.component.html',
  styleUrls: ['./personnel-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class PersonnelFormComponent implements OnInit {
  personnelForm!: FormGroup;
  isEditMode = false;
  personnelId: string | null = null;
  flightNumberError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private personnelService: PersonnelService,
    private flightService: FlightService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personnelForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      contact: ['', Validators.required],
      flight_number: ['']
    });

    this.personnelId = this.route.snapshot.paramMap.get('id');
    if (this.personnelId) {
      this.isEditMode = true;
      this.personnelService.getPersonnelById(this.personnelId).subscribe(person => {
        this.personnelForm.patchValue(person);
      });
    }
  }

  onSubmit() {
    if (this.personnelForm.invalid) return;

    const flight_number = this.personnelForm.get('flight_number')?.value;
    if (flight_number) {
      this.flightService.getFlightById(flight_number).pipe(
        map(() => true),
        catchError(() => of(false))
      ).subscribe(exists => {
        if (!exists) {
          this.flightNumberError = 'Flight number does not exist.';
        } else {
          this.flightNumberError = null;
          this.savePersonnel();
        }
      });
    } else {
      this.savePersonnel();
    }
  }

  private savePersonnel() {
    if (this.isEditMode && this.personnelId) {
      this.personnelService.updatePersonnel(this.personnelId, this.personnelForm.value).subscribe(() => {
        this.router.navigate(['/personnel/list']);
      });
    } else {
      this.personnelService.addPersonnel(this.personnelForm.value).subscribe(() => {
        this.router.navigate(['/personnel/list']);
      });
    }
  }
}