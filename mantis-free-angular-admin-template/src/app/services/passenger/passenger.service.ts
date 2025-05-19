import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passenger } from 'src/app/models/passengers.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  private apiUrl = 'http://localhost:3000/api/passengers';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
    });
  }

  getAllPassengers(): Observable<Passenger[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Passenger[]>(this.apiUrl, { headers });
  }

  getPassengerById(id: string): Observable<Passenger> {
    const endpoint = `${this.apiUrl}/${id}`;
    const headers = this.getAuthHeaders();
    return this.http.get<Passenger>(endpoint, { headers });
  }

  addPassenger(passenger: Passenger): Observable<Passenger> {
    const endpoint = `${this.apiUrl}`;
    const headers = this.getAuthHeaders();
    return this.http.post<Passenger>(endpoint, passenger, { headers });
  }

  updatePassenger(id: string, passengerData: Partial<Passenger>): Observable<Passenger> {
    const endpoint = `${this.apiUrl}/${id}`;
    const headers = this.getAuthHeaders();
    return this.http.post<Passenger>(endpoint, passengerData, { headers });
  }
}
