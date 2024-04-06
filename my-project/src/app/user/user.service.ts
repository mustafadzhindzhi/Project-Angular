import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, catchError, tap } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  USER_KEY = '[user]';

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
   
  }

  login(email: string, password: string) {
    return this.http.post<UserForAuth>('/api/login', { email, password }, { withCredentials: true }).pipe(
      tap((user) => {
        console.log('User:', user);
        const token = user.token;
        localStorage.setItem('token',token)
        console.log('token',token);
        
      // this.loadUserFromCookie(); 
        
        // const cookieValue = this.getCookie('auth-cookie');
        
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
    return this.http.post('/api/logout', {}, { withCredentials: true }).pipe(
      tap(() => {
        this.user$$.next(undefined);
      })
    );
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('/api/users/profile', { withCredentials: true })
      .pipe(tap((user) => this.user$$.next(user)),     
    )   
  }

  getProfiles(): Observable<UserForAuth[]> {
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

  // private loadUserFromCookie(): void {
  //   const cookieName = 'auth-cookie'; 
  //   const cookieData = this.parseCookie(cookieName);
    
  //   if (cookieData) {
  //     console.log(`${cookieName} value:`, cookieData);
  //     this.user$$.next(cookieData);
  //   } else {
  //     this.user$$.next(undefined);
  //   }
  // }

  // private parseCookie(cookieName: string): UserForAuth | null {
  //   const cookieString = document.cookie;
  //   const cookies = cookieString.split(';');
  //   for (const cookie of cookies) {
  //     const [name, value] = cookie.trim().split('=');
  //     if (name === cookieName) {
  //       try {
  //         return JSON.parse(decodeURIComponent(value));
  //       } catch (error) {
  //         console.error('Error parsing cookie:', error);
  //         return null;
  //       }
  //     }
  //   }
  //   return null;
  // }

  // private getCookie(name: string): string | null {
  //   const cookieString = document.cookie;
  //   const cookies = cookieString.split(';');
  //   for (const cookie of cookies) {
  //     const [cookieName, cookieValue] = cookie.trim().split('=');
  //     if (cookieName === name) {
  //       return decodeURIComponent(cookieValue);
  //     }
  //   }
  //   return null;
  // }
  
  
}