import { Observable } from 'rxjs';
import { Profile } from './../models/profile';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User = null;
  private apiUrl = 'https://conduit.productionready.io/api'
  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): boolean {
    if (this.user === null) {
      let localUser = localStorage.getItem('user');
      if (localUser) {
        this.user = JSON.parse(localUser);
      }
    }
    return !!this.user;
  }

  getUser(): User {
    return this.user;
  }

  getProfile(username: string): Observable<Profile> {
    return this.http.get(
      this.apiUrl + `/profiles/${username}`
    ) as Observable<Profile>;
  }

  signup(user) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(this.apiUrl + '/users', { user: user }).subscribe(
        (res: any) => {
          this.logUserIn(res.user);
          resolve();
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  logUserIn(user): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  login(user) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(this.apiUrl + '/users/login', { user: user }).subscribe(
        (res: any) => {
          this.logUserIn(res.user);
          resolve();
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  logout() {
    localStorage.removeItem('user');
    window.location.reload()
  }
}
