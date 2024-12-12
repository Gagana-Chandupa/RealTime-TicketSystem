package com.oopcw.backend;

import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class TicketingService {

    private TicketingConfig config;//Save the configurations for system
    private final TicketPool ticketPool;//Pool for vendors and customers
    private ExecutorService vendorExecutor;//Thread pool for managing vendor threads.
    private ExecutorService customerExecutor;// Thread pool for managing customer threads

    public TicketingService(TicketPool ticketPool) {
        this.ticketPool = ticketPool;
    }

    public synchronized void configureSystem(TicketingConfig config) {
        this.config = config;
        ticketPool.configureMaxCapacity(config.getMaxTicketCapacity());
    }

    public void startSystem() {
        if (config == null) {
            throw new IllegalStateException("System not configured!");
        }
        // Initialize thread pools for vendors and customers
        vendorExecutor = Executors.newFixedThreadPool(5);
        customerExecutor = Executors.newFixedThreadPool(5);

        for (int i = 1; i <= 5; i++) {
            vendorExecutor.submit(new Vendor(i, ticketPool, config.getTicketReleaseRate(), config.getTotalTickets() / 5));
            customerExecutor.submit(new Customer(i, ticketPool, config.getCustomerRetrievalRate()));
        }
    }
    //stop the system by shutting down all active and vendor threads
    public void stopSystem() {
        if (vendorExecutor != null) vendorExecutor.shutdownNow();
        if (customerExecutor != null) customerExecutor.shutdownNow();
        System.out.println("Simulation stopped.");
    }
}

