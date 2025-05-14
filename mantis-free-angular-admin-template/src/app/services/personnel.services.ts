import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personnel } from '../models/personnel.models';

@Injectable({
  providedIn: 'root',
})
export class PersonnelService {
  private apiUrl = 'http://localhost:3000/api/personnel';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Personnel[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
    });
    return this.http.get<Personnel[]>(this.apiUrl, { headers });
  }
}