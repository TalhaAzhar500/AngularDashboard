import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDetailsService } from './shared/user-details.service';

@Injectable({
  providedIn: 'root',
})
export class HTTPService {
  constructor(
    private http: HttpClient,
    private userDetails: UserDetailsService
  ) {}

  private getHeaders(): HttpHeaders {
    const token: string = this.userDetails.data.access_token;

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  post(url: string, data: any) {
    return this.http.post(url, data);
  }

  add(url: string, adminDetails: any) {
    const headers = this.getHeaders();
    return this.http.post(url, adminDetails, { headers });
  }

  get(url: string) {
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  delete(url: string) {
    const headers = this.getHeaders();
    return this.http.delete(url, { headers });
  }

  edit(url: string, projectDetails: any) {
    const headers = this.getHeaders();
    return this.http.patch(url, projectDetails, { headers });
  }

  reset(url: string, passwords: any) {
    const headers = this.getHeaders();
    return this.http.post(url, passwords, { headers });
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGU4OGI2YTk2YmI5ODE2NzU4OTRhOTQiLCJyb2xlIjoic3VwZXIiLCJpYXQiOjE2OTMyMDAxNDIsImV4cCI6MTY5MzIwMzc0Mn0._FEeG2FR_Ef8GE0EI39C6u112gzCgIEaiTIeqGbzu0o
