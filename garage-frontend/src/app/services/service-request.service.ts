import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceRequest {
  id?: number;
  vehicle?: any;       // full vehicle object from backend
  description: string;
  status?: string;
  estimatedCost?: number;
  actualCost?: number;
  createdAt?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  private apiUrl = 'http://localhost:8080/api/service-requests';

  constructor(private http: HttpClient) {}

  getAllRequests(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(this.apiUrl);
  }

  createRequest(request: ServiceRequest): Observable<ServiceRequest> {
    return this.http.post<ServiceRequest>(this.apiUrl, request);
  }

  deleteRequest(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: number, status: string): Observable<ServiceRequest> {
    return this.http.put<ServiceRequest>(
      `${this.apiUrl}/${id}?status=${status}`,
      {}
    );
  }
}

