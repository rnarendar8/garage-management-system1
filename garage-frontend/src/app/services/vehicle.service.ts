import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vehicle {
  id?: number;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  vinNumber?: string;
  customer?: any;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = 'http://localhost:8080/api/vehicles';

  constructor(private http: HttpClient) {}

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  addVehicle(vehicle: Vehicle, customerId: number): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/${customerId}`, vehicle);
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
