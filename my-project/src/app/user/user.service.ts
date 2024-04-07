import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  USER_KEY = '[user]';
  TOKEN_KEY = 'token'; 

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  get currentUserId(): string | undefined {
    if (this.user && this.user.id) {
      return this.user.id;
    }
    return undefined;
  }
  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });

    this.loadUserFromLocalStorage();
  }

  login(email: string, password: string) {
    return this.http.post<UserForAuth>('/api/login', { email, password }, { withCredentials: true }).pipe(
      tap((user) => {
        const token = user.token;
        localStorage.setItem(this.TOKEN_KEY, token);
        this.user$$.next(user);
      })
    );
  }

  register(
    username: string,
    email: string,
    tel: string,
    password: string,
    rePassword: string,
    image: string
  ) {
    return this.http
      .post<UserForAuth>('/api/register', {
        username,
        email,
        tel,
        password,
        rePassword,
        image,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.user$$.next(undefined); 
    return this.http.post('/api/logout', {}, { withCredentials: true }).pipe(
      tap(() => {
      })
    );
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('/api/users/profile', { withCredentials: true })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getProfiles() {
    return this.http.get<UserForAuth[]>('/api/users/profiles');
  }

  updateProfile(username: string, email: string, tel?: string) {
    return this.http
      .put<UserForAuth>('/api/users/profile', {
        username,
        email,
        tel,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  private loadUserFromLocalStorage(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.getProfile().subscribe({
        next: (user) => {
          this.user$$.next(user);
        },
        error: () => {
          localStorage.removeItem(this.TOKEN_KEY);
          this.user$$.next(undefined);
        },
      });
    }
  }
}
