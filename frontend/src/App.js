import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TicketForm from "./components/TicketForm";
import Log from "./components/Log";
import axios from 'axios';
import { startSystem, stopSystem, configureTickets } from "./api";

function App() {
  const [logs, setLogs] = useState([]);
  const [isSystemRunning, setIsSystemRunning] = useState(false);
  const [isSystemConfigured, setIsSystemConfigured] = useState(false);
  const API_BASE_URL = 'http://localhost:8080/api/config';


  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleConfigure = async (configData) => {
    try {
      const response = await configureTickets(configData);
      addLog("Configuration successful: " + response);
      setIsSystemConfigured(true);
    } catch (error) {
      addLog("Error configuring system: " + error.message);
    }
  };
  const handleGetConfig = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/configure`);
      addLog("Current configuration: " + JSON.stringify(response.data));
    } catch (error) {
      addLog("Error fetching configuration: " + error.message);
    }
  };
  

  const handleStart = async () => {
    if (!isSystemConfigured) {
      addLog("System must be configured before starting.");
      return;
    }
    try {
      const response = await startSystem();
      addLog("System started: " + response);
      setIsSystemRunning(true);
    } catch (error) {
      addLog("Error starting system: " + error.message);
    }
  };

  const handleStop = async () => {
    try {
      const response = await stopSystem();
      addLog(`System stopped: ${response.message}`);
      setIsSystemRunning(false);
    } catch (error) {
      addLog(`Error stopping system: ${error.message}`);
    }
  };

  return (
    <div>
      <Header />
      <main className="p-6">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={handleStart}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            disabled={!isSystemConfigured || isSystemRunning}
          >
            Start System
          </button>
          <button
            onClick={handleStop}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            disabled={!isSystemRunning}
          >
            Stop System
          </button>
        </div>
        <TicketForm addLog={addLog} handleConfigure={handleConfigure} handleGetConfig={handleGetConfig} />
        <Log logs={logs} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
