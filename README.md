# 🚗 Garage Management System

A complete full-stack Garage Management System developed using **Spring Boot, Angular, MySQL, and JWT Authentication**. The application helps a garage administrator manage customers, vehicles, service requests, and track overall garage operations through a secure dashboard.

---

# 📌 Project Overview

The Garage Management System is designed to digitize the daily operations of a vehicle repair garage.

It provides a centralized platform where administrators can:

* Manage customer information
* Manage vehicle records
* Create and track service requests
* Update service progress
* Monitor garage statistics through a dashboard
* Securely access the system using JWT authentication

The project follows a layered architecture with separate frontend and backend applications.

---

# 🛠 Technology Stack

## Frontend

* Angular 21
* TypeScript
* Angular Standalone Components
* Angular Material
* HTML5
* CSS3
* RxJS

## Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* REST APIs
* JWT Authentication

## Database

* MySQL

## Development Tools

* IntelliJ IDEA
* Git & GitHub
* Postman
* Maven
* npm

---

# 🏗 System Architecture

```
Angular Frontend
        |
        | HTTP Request + JWT Token
        |
Spring Boot REST API
        |
        |
Service Layer (Business Logic)
        |
        |
Repository Layer (JPA)
        |
        |
MySQL Database
```

---

# ✨ Features

## 🔐 Authentication & Security

* User Login System
* JWT Token Generation and Validation
* Password Encryption using BCrypt
* Spring Security Configuration
* Protected API Endpoints
* Route Guards
* HTTP Authentication Interceptor
* Automatic Logout on Unauthorized Access

---

## 👥 Customer Management

* Create Customers
* View Customer List
* Update Customer Details
* Delete Customers
* Input Validation
* Error Handling

---

## 🚗 Vehicle Management

* Add Vehicle Details
* View Vehicles
* Update Vehicle Information
* Delete Vehicles
* Link Vehicles with Customers

---

## 🔧 Service Request Management

* Create Service Requests
* Track Service Status
* Update Status:

  * PENDING
  * IN_PROGRESS
  * COMPLETED
* Delete Service Requests
* Vehicle-wise Service Tracking

---

## 📊 Dashboard

Provides a summary of:

* Total Customers
* Total Vehicles
* Total Service Requests
* Completed Jobs
* Revenue Tracking Structure

---

## 🎨 User Experience Features

* Responsive Admin Layout
* Sidebar Navigation
* Loading Components
* User-Friendly Error Messages
* Form Validation
* Clean UI Design

---

# 🧪 Testing Performed

The application was tested manually for:

* Authentication flow
* JWT token validation
* Protected route access
* Customer CRUD operations
* Vehicle CRUD operations
* Service Request CRUD operations
* Dashboard data accuracy
* API error handling
* Invalid login scenarios

---

# 🧩 Challenges Faced & Solutions Implemented

## 1. JWT Authentication Integration

### Challenge:

Managing secure communication between Angular and Spring Boot APIs.

### Solution:

Implemented JWT-based authentication with:

* Spring Security filters
* Angular HTTP interceptors
* Route guards
* Token validation and automatic logout

---

## 2. Angular Routing & Navigation Issues

### Challenge:

After successful login, navigation was redirecting back to the login page due to route configuration and authentication flow issues.

### Solution:

Implemented proper Angular routing structure using:

* Protected routes
* Auth guards
* Login guards
* Correct sidebar navigation paths

---

## 3. SSR and Local Storage Error

### Challenge:

Angular generated the error:

```
localStorage is not defined
```

### Solution:

Added browser environment checks before accessing localStorage to make the application SSR-safe.

---

## 4. Service Request API Integration Issue

### Challenge:

The frontend sent JSON data while the backend expected URL parameters, causing API failures.

### Solution:

Refactored the API using DTO-based request handling, making communication between Angular and Spring Boot clean and scalable.

---

## 5. API Endpoint Mismatch

### Challenge:

Service status updates failed due to different endpoint structures between frontend and backend.

### Solution:

Aligned Angular service URLs with Spring Boot controller mappings.

---

## 6. Loading and Error Handling

### Challenge:

Users experienced blank screens while APIs were loading or failing.

### Solution:

Implemented:

* Global loading components
* User-friendly error messages
* Better API failure handling

---

# 📁 Project Structure

```
garage-management-system
|
├── garage-backend
|   |
|   ├── controller
|   ├── service
|   ├── repository
|   ├── entity
|   ├── security
|   └── dto
|
├── garage-frontend
|   |
|   ├── components
|   ├── services
|   ├── guards
|   ├── interceptors
|   └── models
|
└── README.md
```

---

# 🚀 Future Enhancements (Version 2)

Planned improvements:

* Service Billing System
* Estimated and Actual Cost Management
* Invoice Generation (PDF)
* Payment Tracking
* Service History Module
* Trash & Restore Functionality
* Search and Filter Options
* Email/SMS Notifications
* Analytics and Reports
* Dark Mode UI

---

# ⚙️ Installation Guide

## Backend Setup

```bash
cd garage-backend

mvn clean install

mvn spring-boot:run
```

Runs on:

```
http://localhost:8080
```

---

## Frontend Setup

```bash
cd garage-frontend

npm install

ng serve
```

Runs on:

```
http://localhost:4200
```

---

# 👨‍💻 Author

**Ramavath Narendar**

Full Stack Developer | Java | Spring Boot | Angular | MySQL

GitHub:
https://github.com/rnarendar8

---


customers  
<img width="1919" height="752" alt="image" src="https://github.com/user-attachments/assets/c83c5fb3-3b69-4c04-b047-ae1ca0f22e8b" />


# ⭐ Conclusion

This project demonstrates practical experience in developing a secure full-stack enterprise application using modern technologies. It showcases authentication, API development, database management, frontend-backend integration, debugging, and real-world problem-solving.
