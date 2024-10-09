import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  GetAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('https://localhost:5001/users');
  }

  SaveUserDetails(userDetails: User): Observable<number> {
    return this.httpClient.put<number>(
      'https://localhost:5001/users/save',
      userDetails
    );
  }
}
