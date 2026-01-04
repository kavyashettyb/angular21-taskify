import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'https://gorest.co.in/public/v2/users';

  constructor(private http: HttpClient) {}

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
}
