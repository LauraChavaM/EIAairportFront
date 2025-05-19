import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/services.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://localhost:3000/api/services';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('AuthToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllServices(): Observable<Service[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Service[]>(this.apiUrl, { headers });
  }

  addService(service: Service): Observable<Service> {
    const headers = this.getAuthHeaders();
    return this.http.post<Service>(`${this.apiUrl}`, service, { headers });
  }

  updateService(id: string, serviceData: Partial<Service>): Observable<Service> {
    const headers = this.getAuthHeaders();
    return this.http.post<Service>(`${this.apiUrl}/${id}`, serviceData, { headers });
  }

  deleteService(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}