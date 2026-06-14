package com.garage.garagebackend.controller;

import com.garage.garagebackend.dto.CustomerDTO;
import com.garage.garagebackend.entity.Customer;
import com.garage.garagebackend.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // ================= CREATE =================
    @PostMapping
    public Customer createCustomer(@Valid @RequestBody CustomerDTO dto) {
        return customerService.createCustomer(dto);
    }

    // ================= READ ALL =================
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    // ================= READ BY ID =================
    @GetMapping("/{id}")
    public Customer getCustomer(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    // ================= UPDATE =================
    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id,
                                   @Valid @RequestBody CustomerDTO dto) {
        return customerService.updateCustomer(id, dto);
    }

    // ================= DELETE =================
    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }
}
