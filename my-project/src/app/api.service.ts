import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Project } from './types/project';
import { User } from './types/user';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    console.log('Fetching project with id:', id);
    const { apiUrl } = environment;
    return this.http.get<Project>(`${apiUrl}/projects/${id}`);
  }

  getRandomProjects (count: number) {
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
    console.log("Creating project...", projectData); 
    return this.http.post<Project>(`/api/projects`, projectData);
  }

  updateProject(projectId: string, postId: string, postText: string) {
    return this.http.put<Project>(`/api/projects/${projectId}/posts/${postId}`, {
      postText,
    });
  }

  deleteProject(projectId: string, postId: string) {
    return this.http.delete<Project>(`/api/projects/${projectId}/posts/${postId}`);
  }

  getUserById(_ownerId: string) {
    const { apiUrl } = environment;
    return this.http.get<User>(`${apiUrl}/users/${_ownerId}`);
  }
}