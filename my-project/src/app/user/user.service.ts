import { Injectable, OnDestroy } from '@angular/core';
import { Message, UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  USER_KEY = '[user]';
  TOKEN_KEY = 'token';

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  get currentUserId(): string | undefined {
    if (!!this.user) {
      if (this.user.hasOwnProperty('_id')) {
        return this.user._id;
      } else {
        return undefined;
      }
    } else {
      console.warn('User object is undefined.');
      return undefined;
    }
  }

  constructor(private http: HttpClient, private router: Router) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });

    this.loadUserFromLocalStorage();
  }

  login(email: string, password: string) {
    return this.http.post<UserForAuth>('/api/login', { email, password }, { withCredentials: true }).pipe(
      tap((user) => {
        this.setToken(user.token);
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
    return this.http.post<UserForAuth>('/api/register', {
      username,
      email,
      tel,
      password,
      rePassword,
      image,
    }).pipe(
      tap((user) => {
        this.setToken(user.token);
        this.user$$.next(user);
      })
    );
  }

  logout() {
    this.removeToken();
    this.user$$.next(undefined);

    return this.http.post('/api/logout', {}, { withCredentials: true }).pipe(
      tap(() => {
        this.router.navigateByUrl('/auth/signUp');
      }),
    );
  }

  getProfile() {
    return this.http.get<UserForAuth>('/api/users/profile', { withCredentials: true }).pipe(
      tap((user) => this.user$$.next(user))
    );
  }

  getProfiles() {
    return this.http.get<UserForAuth[]>('/api/users/profiles');
  }

  updateProfile(username: string, email: string, tel?: string) {
    return this.http.put<UserForAuth>('/api/users/profile', { username, email, tel }).pipe(
      tap((user) => this.user$$.next(user))
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  private loadUserFromLocalStorage(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token || this.isLogged) {
      this.getProfile().subscribe({
        next: (user) => {
          this.user$$.next(user);
        },
        error: () => {
          this.removeToken();
          this.user$$.next(undefined);
        },
      });
    }
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  saveMessage(name: string, email: string, message: string) {
    const { apiUrl } = environment;
    return this.http.post<Message>(`${apiUrl}/messages`, { name, email, message }).pipe(
      tap(() => console.log('Message saved successfully'))
    );
  }
}
