import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customer {
  id?: number;          // ✅ optional
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;       // optional is better
  address?: string;
}


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}


  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }
  addCustomer(customer: Omit<Customer, 'id'>) {
    return this.http.post<Customer>(this.apiUrl, customer);
  }
  deleteCustomer(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateCustomer(id: number, customer: Customer) {
    return this.http.put(`${this.apiUrl}/${id}`, customer);
}





}
