import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/models/flights.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private api_url = 'http://localhost:3000/api/flights';

  constructor(private http: HttpClient) { }

  // Get all flights
  getAllFlights(): Observable<Flight[]> {
    const endpoint = this.api_url;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
    };
    return this.http.get<Flight[]>(endpoint, { headers });
  }

  // Get a flight by ID
  getFlightById(id: string): Observable<Flight> {
    const endpoint = `${this.api_url}/${id}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
    };
    return this.http.get<Flight>(endpoint, { headers });
  }

  // Create a new flight
  createFlight(flight: Flight): Observable<Flight> {
    const endpoint = `${this.api_url}/create`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
    };
    return this.http.post<Flight>(endpoint, flight, { headers });
  }

  // Update an existing flight
  updateFlight(id: string, flightData: Partial<Flight>): Observable<Flight> {
    const endpoint = `${this.api_url}/${id}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
    };
    return this.http.put<Flight>(endpoint, flightData, { headers });
  }

  // Change flight status
  changeFlightStatus(id: string, status: string): Observable<any> {
    const endpoint = `${this.api_url}/changeStatus/${id}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
    };
    const body = { status };
    return this.http.post(endpoint, body, { headers });
  }


}
