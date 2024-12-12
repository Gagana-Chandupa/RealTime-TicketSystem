package com.oopcw.backend;

public class Vendor implements Runnable {

    private final int vendorId;
    private final TicketPool ticketPool;
    private final int releaseRate; // Tickets per second
    private final int ticketsToProduce; // Total tickets this vendor will produce

    public Vendor(int vendorId, TicketPool ticketPool, int releaseRate, int ticketsToProduce) {
        this.vendorId = vendorId;
        this.ticketPool = ticketPool;
        this.releaseRate = releaseRate;
        this.ticketsToProduce = ticketsToProduce;
    }

    @Override
    public void run() {
        try {
            for (int i = 0; i < ticketsToProduce; i++) {
                ticketPool.addTicket(vendorId); // Add a ticket to the pool
                Thread.sleep((long) (Math.random() * (1000 / releaseRate))); // Randomized delay
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Vendor-" + vendorId + " was interrupted.");
        }
    }
}
