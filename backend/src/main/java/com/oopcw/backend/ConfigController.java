package com.oopcw.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Enables request processing.
@RestController
@RequestMapping("/api/config")// This controller's endpoints are all mapped to begin with "/api/config".
public class ConfigController {

    private final TicketingService ticketingService;

    public ConfigController(TicketingService ticketingService) {
        this.ticketingService = ticketingService;
    }

    @PostMapping("/configure")
    public ResponseEntity<String> configureSystem(@RequestBody TicketingConfig config) {
        ObjectMapper objectMapper = new ObjectMapper();// Object mapper for JSON operations

        File configFile = new File("config.json");//Name the file where configuration will be saved
        try {
            // Writes the configuration object to a JSON file
            objectMapper.writeValue(configFile, config);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        // Applies the configuration using the ticketing service.
        ticketingService.configureSystem(config);
        return ResponseEntity.ok("System configured successfully.");
    }

    @PostMapping("/start")
    public ResponseEntity<String> startSystem() {
        ticketingService.startSystem();//start the system
        return ResponseEntity.ok("System started successfully.");
    }

    @PostMapping("/stop")
    public ResponseEntity<String> stopSystem() {
        ticketingService.stopSystem();//stops the system
        return ResponseEntity.ok("System stopped.");
    }

}

