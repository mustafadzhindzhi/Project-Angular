import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Project } from './types/project';
import { User } from './types/user';

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
  createProject(projectData: any) { 
    console.log("Creating project...", projectData); // Add this line
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