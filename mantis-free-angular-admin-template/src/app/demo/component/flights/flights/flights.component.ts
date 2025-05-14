import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight/flight.service';
import { Flight } from 'src/app/models/flights.model';
import { CommonModule } from '@angular/common'; // Import CommonModule


@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  imports: [CommonModule],
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit {
  flights: Flight[] = []; // Array to hold flight data
  isLoading: boolean = true; // Loading state

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.getFlights(); // Fetch flights on component initialization
  }

  getFlights(): void {
    this.flightService.getAllFlights().subscribe({
      next: (data: Flight[]) => {
        this.flights = data; // Assign fetched flights to the array
        this.isLoading = false; // Turn off loading state
      },
      error: (err) => {
        console.error('Error fetching flights:', err);
        this.isLoading = false; // Turn off loading state even on error
      },
    });
  }
}