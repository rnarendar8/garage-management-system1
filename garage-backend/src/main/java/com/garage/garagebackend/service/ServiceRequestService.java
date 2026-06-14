package com.garage.garagebackend.service;

import com.garage.garagebackend.entity.ServiceRequest;
import com.garage.garagebackend.entity.Vehicle;
import com.garage.garagebackend.repository.ServiceRequestRepository;
import com.garage.garagebackend.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ServiceRequestService {

    private final ServiceRequestRepository serviceRequestRepository;
    private final VehicleRepository vehicleRepository;

    public ServiceRequestService(ServiceRequestRepository serviceRequestRepository,
                                 VehicleRepository vehicleRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.vehicleRepository = vehicleRepository;
    }

    public ServiceRequest createServiceRequest(Long vehicleId, String description) {

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        ServiceRequest request = new ServiceRequest();
        request.setDescription(description);
        request.setStatus("PENDING");
        request.setCreatedAt(LocalDateTime.now());
        request.setVehicle(vehicle);

        return serviceRequestRepository.save(request);
    }

    public List<ServiceRequest> getAllRequests() {
        return serviceRequestRepository.findAll();
    }

    public ServiceRequest updateStatus(Long id, String status) {
        ServiceRequest request = serviceRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(status);
        return serviceRequestRepository.save(request);
    }

    public void deleteRequest(Long id) {
        serviceRequestRepository.deleteById(id);
    }
}
