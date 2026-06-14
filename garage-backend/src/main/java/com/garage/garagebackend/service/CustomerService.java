package com.garage.garagebackend.service;

import com.garage.garagebackend.dto.CustomerDTO;
import com.garage.garagebackend.entity.Customer;
import com.garage.garagebackend.repository.CustomerRepository;
import com.garage.garagebackend.exception.DuplicateResourceException;
import com.garage.garagebackend.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    // ================= CREATE =================
    public Customer createCustomer(CustomerDTO dto) {

        if (customerRepository.existsByPhone(dto.getPhone())) {
            throw new DuplicateResourceException("Phone already exists");
        }

        if (dto.getEmail() != null &&
                customerRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        Customer customer = new Customer();
        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setPhone(dto.getPhone());
        customer.setEmail(dto.getEmail());
        customer.setAddress(dto.getAddress());

        return customerRepository.save(customer);
    }

    // ================= READ ALL =================
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // ================= READ BY ID =================
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));
    }

    // ================= UPDATE =================
    public Customer updateCustomer(Long id, CustomerDTO dto) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        // Check phone uniqueness (only if changed)
        if (!customer.getPhone().equals(dto.getPhone()) &&
                customerRepository.existsByPhone(dto.getPhone())) {
            throw new DuplicateResourceException("Phone already exists");
        }

        // Check email uniqueness (only if changed)
        if (dto.getEmail() != null &&
                !dto.getEmail().equals(customer.getEmail()) &&
                customerRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setPhone(dto.getPhone());
        customer.setEmail(dto.getEmail());
        customer.setAddress(dto.getAddress());

        return customerRepository.save(customer);
    }

    // ================= DELETE =================
    public void deleteCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        customerRepository.delete(customer);
    }
}
