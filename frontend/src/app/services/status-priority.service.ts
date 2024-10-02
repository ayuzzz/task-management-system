import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../models/status';
import { Priority } from '../models/priority';

@Injectable({
  providedIn: 'root',
})
export class StatusPriorityService {
  private baseUrl = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {}

  GetStatusData(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(`${this.baseUrl}/status`);
  }

  GetPriorityData(): Observable<Priority[]> {
    return this.httpClient.get<Priority[]>(`${this.baseUrl}/priority`);
  }
}
