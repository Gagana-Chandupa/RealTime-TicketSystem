package com.oopcw.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data//Generate getters,setter
@NoArgsConstructor//Generate constructors without arguments
@AllArgsConstructor//Generate constructors with arguments
public class TicketingConfig {
    private int totalTickets;//Total no of tickets in the system
    private int ticketReleaseRate;//Rate which ticket release from system
    private int customerRetrievalRate;//Rate which customers retrieve tickets from system
    private int maxTicketCapacity;//The maximum capacity of system
}

