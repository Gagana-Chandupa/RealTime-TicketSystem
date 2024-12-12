package com.oopcw.backend;

import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.Queue;

@Component
public class TicketPool {

    private final TicketRepository ticketRepository;//Manages the database's ticket permanence.
    private final Queue<Long> ticketQueue = new LinkedList<>();// Queue to manage ticket IDs
    private int maxCapacity;

    public TicketPool(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
    //configure the maximum ticket capacity
    public synchronized void configureMaxCapacity(int maxCapacity) {
        this.maxCapacity = maxCapacity;
    }
    //vendor adding a ticket
    public synchronized void addTicket(int vendorId) throws InterruptedException {
        while (ticketQueue.size() >= maxCapacity) {
            System.out.println("Ticket pool is full. Vendor-" + vendorId + " is waiting...");
            wait();
        }
        // Save the new ticket in the repository and add its ID to the queue
        Ticket ticket = ticketRepository.save(new Ticket());
        ticketQueue.add(ticket.getId());
        System.out.println("Vendor-" + vendorId + " added: Ticket-" + ticket.getId());
        notifyAll();
    }

    //Customer retrieving the ticket from the pool
    public synchronized Long removeTicket(int customerId) throws InterruptedException {
        //wait when pool is empty
        while (ticketQueue.isEmpty()) {
            System.out.println("No tickets available. Customer-" + customerId + " is waiting...");
            wait();
        }
        Long ticketId = ticketQueue.poll();//Retrieve ticket from queue
        System.out.println("Customer-" + customerId + " purchased: Ticket-" + ticketId);
        notifyAll();
        return ticketId;
    }
}
