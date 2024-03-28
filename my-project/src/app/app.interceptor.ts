import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ErrorService } from './core/error/error.service';
import { Router } from '@angular/router';

const { apiUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  API = '/api';

  constructor(private errorService: ErrorService, private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(this.API)) {
      req = req.clone({
        url: req.url.replace(this.API, apiUrl),
        withCredentials: true,
      });
    }

    console.log('Request intercepted:', req.url);

    return next.handle(req).pipe(
      catchError((error) => {
        console.error('Error occurred in request:', error);
        if (error.status === 401) {
          console.log('Redirecting to login page due to 401 error');
          // Add console.log statements to debug the flow
          console.log('Error response:', error);
        } else {
          console.log('Redirecting to error page due to other error');
          // Add console.log statements to debug the flow
          console.log('Error response:', error);
        }
        return throwError(error); // Pass the error down the chain for handling in components
      })
    );
  }
}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true,
};
