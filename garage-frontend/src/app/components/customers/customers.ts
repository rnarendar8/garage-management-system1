import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule,LoadingComponent],
  templateUrl: './customers.html'
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = [];
  errorMessage = '';

  newCustomer: Customer = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: ''
  };

  isEditMode: boolean = false;
  editCustomerId?: number;
  loading = true;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  // ================= LOAD CUSTOMERS =================
  loadCustomers() {

    this.loading = true;

    this.customerService.getAllCustomers().subscribe({

      next: (data) => {
        this.customers = data;
        this.loading = false;
      },

     error: (error: any) => {

       console.error(error);

       this.errorMessage =
         "Unable to load customers. Please try again.";

       this.loading = false;
     }

    });

  }

  // ================= ADD OR UPDATE =================
  addCustomer() {

    if (this.isEditMode && this.editCustomerId) {

      this.customerService.updateCustomer(this.editCustomerId, this.newCustomer)
        .subscribe({
          next: () => {
            this.loadCustomers();
            this.resetForm();
          },
          error: (err: any) => {
            console.error('Error updating customer', err);
          }
        });

    } else {

      this.customerService.addCustomer(this.newCustomer)
        .subscribe({
          next: () => {
            this.loadCustomers();
            this.resetForm();
          },
          error: (err: any) => {
            console.error('Error adding customer', err);
          }
        });
    }
  }

  // ================= EDIT =================
  editCustomer(customer: Customer) {
    this.newCustomer = { ...customer };
    this.editCustomerId = customer.id;
    this.isEditMode = true;
  }

  // ================= DELETE =================
  deleteCustomer(id: number) {

    const confirmDelete = confirm("Are you sure you want to delete this customer?");

    if (confirmDelete) {
      this.customerService.deleteCustomer(id)
        .subscribe({
          next: () => {
            this.loadCustomers();
          },
          error: (err: any) => {
            console.error('Error deleting customer', err);
          }
        });
    }
  }

  // ================= RESET FORM =================
  resetForm() {
    this.newCustomer = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: ''
    };
    this.isEditMode = false;
    this.editCustomerId = undefined;
  }

}
