import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/models/flights.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private api_url = 'http://localhost:3000/api/flights';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
    });
  }

  getAllFlights(): Observable<Flight[]> {
    const endpoint = this.api_url;
    const headers = this.getAuthHeaders();
    return this.http.get<Flight[]>(endpoint, { headers });
  }

  getFlightById(id: string): Observable<Flight> {
    const endpoint = `${this.api_url}/${id}`;
    const headers = this.getAuthHeaders();
    return this.http.get<Flight>(endpoint, { headers });
  }

  createFlight(flight: Flight): Observable<Flight> {
    const endpoint = `${this.api_url}/create`;
    const headers = this.getAuthHeaders();
    return this.http.post<Flight>(endpoint, flight, { headers });
  }

  updateFlight(id: string, flightData: Partial<Flight>): Observable<Flight> {
    const endpoint = `${this.api_url}/${id}`;
    const headers = this.getAuthHeaders();
    return this.http.put<Flight>(endpoint, flightData, { headers });
  }

  changeFlightStatus(id: string, status: string): Observable<any> {
    const endpoint = `${this.api_url}/changeStatus/${id}`;
    const headers = this.getAuthHeaders();
    const body = { status };
    return this.http.post(endpoint, body, { headers });
  }
}