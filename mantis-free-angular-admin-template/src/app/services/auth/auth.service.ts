import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_url='http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }
  
  authenticate(email:string, password:string): Observable<any>{
    const endpoint = `${this.api_url}/login`;
    const body = {email, password};
    return this.http.post(endpoint, body);
  }


}
