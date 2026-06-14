package com.garage.garagebackend.repository;

import com.garage.garagebackend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    boolean existsByPhone(String phone);
    boolean existsByEmail(String email);
}
