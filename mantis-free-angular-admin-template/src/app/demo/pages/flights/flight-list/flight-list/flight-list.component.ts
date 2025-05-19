import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight/flight.service';
import { Flight } from 'src/app/models/flights.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FlightListComponent implements OnInit {
  flights: Flight[] = [];
  isLoading = true;

  constructor(private flightService: FlightService, private router: Router) {}

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe({
      next: (data) => {
        this.flights = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  goToAdd() {
    this.router.navigate(['/flights/form']);
  }

  goToUpdate(id: string) {
    this.router.navigate(['/flights/form', id]);
  }
}