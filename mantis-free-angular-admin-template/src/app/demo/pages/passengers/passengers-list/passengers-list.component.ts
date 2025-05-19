import { Component, OnInit } from '@angular/core';
import { PassengerService } from 'src/app/services/passenger/passenger.service';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/models/passengers.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-passengers-list',
  templateUrl: './passengers-list.component.html',
  styleUrls: ['./passengers-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PassengersListComponent implements OnInit {
  passengers: Passenger[] = [];
  isLoading = true;

  constructor(private passengerService: PassengerService, private router: Router) {}

  ngOnInit(): void {
    this.passengerService.getAllPassengers().subscribe({
      next: (data) => {
        this.passengers = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  goToAdd() {
    this.router.navigate(['/passengers/form']);
  }

  goToUpdate(id: string) {
    this.router.navigate(['/passengers/form', id]);
  }
}