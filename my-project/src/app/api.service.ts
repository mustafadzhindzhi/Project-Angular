import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Project } from './types/project';
import { User } from './types/user';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap,of } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getProjects() {
    const { apiUrl } = environment;
    return this.http.get<Project[]>(`${apiUrl}/projects`);
  }

  getProject(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Project>(`${apiUrl}/projects/${id}`);
  }

  getRandomProjects(count: number) {
    const { apiUrl } = environment;
    const randomPage = Math.floor(Math.random() * 10) + 1;
    const params = new HttpParams()
      .set('_page', randomPage.toString())
      .set('_limit', count.toString());
    return this.http.get<Project[]>(`${apiUrl}/projects`, { params });
  }

  searchProjects(searchTerm: string): Observable<Project[]> {
    const { apiUrl } = environment;

    if (searchTerm.trim() !== '') {
      return this.http.get<Project[]>(`${apiUrl}/projects/search`, { params: new HttpParams().set('searchTerm', searchTerm) });
    } else {
      return this.getProjects();
    }
  }

  createProject(projectData: any) {
    return this.http.post<Project>(`/api/projects`, projectData);
  }

  editProject(id: string, projectData: any): Observable<Project> {
    const { apiUrl } = environment;

    return this.http.put<Project>(`${apiUrl}/projects/${id}`, projectData);
  }

  deleteProject(id: string) {
    const {apiUrl} = environment;
    return this.http.delete<Project>(`${apiUrl}/projects/${id}`);
  }

  getUserById(_ownerId: string) {
    const { apiUrl } = environment;
    return this.http.get<User>(`${apiUrl}/users/${_ownerId}`);
  }

  like(projectId: string): Observable<any> {
    const { apiUrl } = environment;
    return this.http.put<Project>(`${apiUrl}/projects/${projectId}/likes`, {});
  }

  unlike(id: string) {
    const { apiUrl } = environment;
    return this.http.put<Project>(`${apiUrl}/projects/${id}/unlike`, {});
  }

  getLatestProjects(): Observable<Project[]> {
    const { apiUrl } = environment;
    console.log('API URL:', apiUrl); 
    return this.http.get<Project[]>(`${apiUrl}/projects/top`).pipe(
      tap((projects) => console.log('Fetched projects:', projects)), 
      catchError((error) => {
        console.error('Error fetching projects:', error); 
        return of([]);
      })
    );
  }
}