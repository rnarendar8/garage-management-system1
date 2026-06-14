import { Component, OnInit } from '@angular/core';
import { ServiceRequestService, ServiceRequest } from '../../services/service-request.service';
import { VehicleService, Vehicle } from '../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading';

@Component({
  selector: 'app-service-requests',
  standalone: true,
  imports: [CommonModule, FormsModule,LoadingComponent],
  templateUrl: './service-requests.html'
})
export class ServiceRequestsComponent implements OnInit {

  requests: ServiceRequest[] = [];
  vehicles: Vehicle[] = [];
  loading = true;
  errorMessage = '';

  newRequest = {
    vehicleId: 0,
    description: ''
  };

  constructor(
    private service: ServiceRequestService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
    this.loadVehicles();
  }

  loadRequests() {

    this.loading = true;

    this.service.getAllRequests().subscribe({

      next: (data: ServiceRequest[]) => {
        this.requests = data;
        this.loading = false;
      },

     error: (error: any) => {

       console.error(error);

       this.errorMessage =
         "Unable to load service requests. Please try again.";

       this.loading = false;
     }

    });
  }

  loadVehicles() {
    this.vehicleService.getAllVehicles().subscribe({
      next: (data: Vehicle[]) => this.vehicles = data,
      error: (err: any) => console.error(err)
    });
  }

  createRequest() {
    this.service.createRequest(this.newRequest).subscribe({
      next: () => {
        this.loadRequests();
        this.newRequest = { vehicleId: 0, description: '' };
      },
      error: (err: any) => console.error(err)
    });
  }



  updateStatus(id: number | undefined, status: string) {
    if (!id) return;

    this.service.updateStatus(id, status).subscribe({
      next: () => this.loadRequests(),
      error: (err: any) => console.error(err)
    });
  }
  deleteRequest(id: number | undefined) {

    if (!id) return;

    const confirmDelete = confirm(
      "Are you sure you want to delete this service request?"
    );

    if (confirmDelete) {
      this.service.deleteRequest(id).subscribe({

        next: () => {
          this.loadRequests();
        },

        error: (error: any) => {
          console.error("Delete failed", error);
        }

      });
    }
  }

  getStatusClass(status: string | undefined) {
    switch (status) {
      case 'PENDING': return 'pending';
      case 'IN_PROGRESS': return 'progress';
      case 'COMPLETED': return 'completed';
      default: return '';
    }
  }
}
