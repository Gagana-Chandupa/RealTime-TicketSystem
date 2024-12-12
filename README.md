# Ticketing System Controller

This project provides a Spring Boot application that manages the lifecycle of a ticketing system using two endpoints: `/start` and `/stop`. The application validates system state and configuration parameters before performing lifecycle operations.

## Features

- **Start Ticketing System (`/start`):**
  - Ensures the system is not already running.
  - Validates configuration parameters (must be greater than zero).
  - Initializes and starts the ticketing system using the `TicketingService`.
  - Returns appropriate HTTP responses for success or failure.

- **Stop Ticketing System (`/stop`):**
  - Ensures the system is currently running.
  - Stops the ticketing system using the `TicketingService`.
  - Handles errors gracefully and returns appropriate HTTP responses.

## Prerequisites

- Java 17 or higher
- Maven 3.8 or higher
- Spring Boot 2.7 or higher

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-repo/ticketing-system-controller.git
cd ticketing-system-controller
