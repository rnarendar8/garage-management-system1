package com.garage.garagebackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VehicleDTO {

    @NotBlank
    private String licensePlate;

    private String make;
    private String model;
    private Integer year;
    private String vinNumber;

    @NotNull
    private Long customerId;
}
