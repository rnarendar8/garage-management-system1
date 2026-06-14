package com.garage.garagebackend.controller;

import com.garage.garagebackend.dto.ServiceRequestDTO;
import com.garage.garagebackend.entity.ServiceRequest;
import com.garage.garagebackend.service.ServiceRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {

    private final ServiceRequestService serviceRequestService;

    public ServiceRequestController(ServiceRequestService serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }

    @PostMapping
    public ServiceRequest createRequest(@RequestBody ServiceRequestDTO dto) {

        return serviceRequestService.createServiceRequest(
                dto.getVehicleId(),
                dto.getDescription()
        );
    }

    @GetMapping
    public List<ServiceRequest> getAllRequests() {
        return serviceRequestService.getAllRequests();
    }

    @PutMapping("/{id}")
    public ServiceRequest updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return serviceRequestService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable Long id) {
        serviceRequestService.deleteRequest(id);
    }
}