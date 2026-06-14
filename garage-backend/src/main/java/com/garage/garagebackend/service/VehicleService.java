package com.garage.garagebackend.service;

import com.garage.garagebackend.entity.Customer;
import com.garage.garagebackend.entity.Vehicle;
import com.garage.garagebackend.exception.DuplicateResourceException;
import com.garage.garagebackend.exception.ResourceNotFoundException;
import com.garage.garagebackend.repository.CustomerRepository;
import com.garage.garagebackend.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final CustomerRepository customerRepository;

    public VehicleService(VehicleRepository vehicleRepository,
                          CustomerRepository customerRepository) {
        this.vehicleRepository = vehicleRepository;
        this.customerRepository = customerRepository;
    }

    // CREATE
    public Vehicle createVehicle(Vehicle vehicle, Long customerId) {

        if (vehicleRepository.existsByLicensePlate(vehicle.getLicensePlate())) {
            throw new DuplicateResourceException("License plate already exists");
        }

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        vehicle.setCustomer(customer);

        return vehicleRepository.save(vehicle);
    }

    // READ ALL
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // READ BY ID
    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));
    }

    // DELETE
    public void deleteVehicle(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vehicle not found");
        }
        vehicleRepository.deleteById(id);
    }
}
