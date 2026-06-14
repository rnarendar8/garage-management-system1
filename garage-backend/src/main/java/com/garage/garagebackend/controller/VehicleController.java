package com.garage.garagebackend.controller;

import com.garage.garagebackend.entity.Vehicle;
import com.garage.garagebackend.service.VehicleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    // CREATE
    @PostMapping("/{customerId}")
    public Vehicle createVehicle(@RequestBody Vehicle vehicle,
                                 @PathVariable Long customerId) {
        return vehicleService.createVehicle(vehicle, customerId);
    }

    // GET ALL
    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Vehicle getVehicle(@PathVariable Long id) {
        return vehicleService.getVehicleById(id);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
    }
}
