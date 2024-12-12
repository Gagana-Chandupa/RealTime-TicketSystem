package com.oopcw.backend;

public class Customer implements Runnable {

    private final int customerId;
    private final TicketPool ticketPool;
    private final int retrievalRate;

    //Initializing the customer properties
    public Customer(int customerId, TicketPool ticketPool, int retrievalRate) {
        this.customerId = customerId;
        this.ticketPool = ticketPool;
        this.retrievalRate = retrievalRate;
    }

    @Override
    public void run() {
        try {
            while (true) {
                ticketPool.removeTicket(customerId); // Purchase a ticket from the pool
                Thread.sleep((long) (Math.random() * (1000 / retrievalRate))); // Creating a delay
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();//Exit threads without interruptions
            System.out.println("Customer-" + customerId + " was interrupted.");
        }
    }
}
