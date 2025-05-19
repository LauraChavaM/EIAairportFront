import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personnel } from 'src/app/models/personnel.model';

@Injectable({
  providedIn: 'root',
})
export class PersonnelService {
  private apiUrl = 'http://localhost:3000/api/personnel';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
    });
  }

  getAllPersonnel(): Observable<Personnel[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Personnel[]>(this.apiUrl, { headers });
  }

  
  addPersonnel(personnel: Personnel): Observable<Personnel> {
    const endpoint = `${this.apiUrl}`;
    const headers = this.getAuthHeaders();
    return this.http.post<Personnel>(endpoint, personnel, { headers });
  }

  updatePersonnel(id: string, personnelData: Partial<Personnel>): Observable<Personnel> {
    const endpoint = `${this.apiUrl}/${id}`;
    const headers = this.getAuthHeaders();
    return this.http.post<Personnel>(endpoint, personnelData, { headers });
  }

  
}