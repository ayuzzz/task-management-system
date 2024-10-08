import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ProjectDetails, ProjectUserMapping } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = 'https://localhost:5001';

  GetProjects(userId: number): Observable<Project[]> {
    return this.httpClient.get<Project[]>(
      `${this.baseUrl}/projects/users/${userId}`
    );
  }

  GetProject(projectId: number): Observable<Project> {
    return this.httpClient.get<Project>(
      `${this.baseUrl}/projects/${projectId}`
    );
  }

  GetProjectUserMappings(): Observable<ProjectUserMapping[]> {
    return this.httpClient.get<ProjectUserMapping[]>(
      `${this.baseUrl}/projects/users`
    );
  }

  UpsertProject(project: ProjectDetails): Observable<number> {
    return this.httpClient.put<number>(`${this.baseUrl}/projects`, project);
  }
}
