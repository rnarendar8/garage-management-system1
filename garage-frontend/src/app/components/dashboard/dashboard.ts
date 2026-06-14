import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { VehicleService } from '../../services/vehicle.service';
import { ServiceRequestService } from '../../services/service-request.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,LoadingComponent],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {

  totalCustomers = 0;
  totalVehicles = 0;
  totalRequests = 0;
  completedRequests = 0;
  totalRevenue = 0;
  loading = true;
  errorMessage = '';

  constructor(
    private customerService: CustomerService,
    private vehicleService: VehicleService,
    private requestService: ServiceRequestService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {

    this.loading = true;

    let completedCalls = 0;

    const checkComplete = () => {
      completedCalls++;

      if (completedCalls === 3) {
        this.loading = false;
      }
    };


    this.customerService.getAllCustomers().subscribe({

      next: (data: any[]) => {
        this.totalCustomers = data.length;
        checkComplete();
      },

      error: (error: any) => {
        console.error(error);
        this.errorMessage = "Unable to load dashboard data.";
        checkComplete();
      }

    });


    this.vehicleService.getAllVehicles().subscribe({

      next: (data: any[]) => {
        this.totalVehicles = data.length;
        checkComplete();
      },

      error: (error: any) => {
        console.error(error);
        checkComplete();
      }

    });


    this.requestService.getAllRequests().subscribe({

      next: (data: any[]) => {

        this.totalRequests = data.length;

        this.completedRequests =
          data.filter(r => r.status === 'COMPLETED').length;

        this.totalRevenue = data
          .filter(r => r.actualCost)
          .reduce(
            (sum, r) => sum + (r.actualCost || 0),
            0
          );

        checkComplete();
      },

      error: (error: any) => {
        console.error(error);
        checkComplete();
      }

    });

  }
}
