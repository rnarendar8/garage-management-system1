import { Component, OnInit } from '@angular/core';
import { VehicleService, Vehicle } from '../../services/vehicle.service';
import { CustomerService, Customer } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule,LoadingComponent],
  templateUrl: './vehicles.html'
})
export class VehiclesComponent implements OnInit {

  vehicles: Vehicle[] = [];
  customers: Customer[] = [];
  loading = true;
  errorMessage = '';

  selectedCustomerId: number | null = null;

  newVehicle: Vehicle = {
    licensePlate: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    vinNumber: ''
  };

  constructor(
    private vehicleService: VehicleService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
    this.loadCustomers();
  }

  loadVehicles() {

    this.loading = true;

    this.vehicleService.getAllVehicles().subscribe({

      next: (data) => {
        this.vehicles = data;
        this.loading = false;
      },

      error: (error: any) => {
        console.error(error);

        this.errorMessage =
          "Unable to load vehicles. Please try again.";

        this.loading = false;
      }

    });
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (data: Customer[]) => this.customers = data,
      error: (err: any) => console.error(err)
    });
  }

  addVehicle() {
    if (!this.selectedCustomerId) {
      alert("Please select a customer");
      return;
    }

    this.vehicleService.addVehicle(this.newVehicle, this.selectedCustomerId)
      .subscribe({
        next: () => {
          this.loadVehicles();
          this.newVehicle = {
            licensePlate: '',
            make: '',
            model: '',
            year: new Date().getFullYear(),
            vinNumber: ''
          };
        },
        error: (err: any) => console.error(err)
      });
  }

  deleteVehicle(id?: number) {
    if (!id) return;

    if (confirm("Delete this vehicle?")) {
      this.vehicleService.deleteVehicle(id).subscribe({
        next: () => this.loadVehicles(),
        error: (err: any) => console.error(err)
      });
    }
  }
}
