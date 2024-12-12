import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/config'; // Replace with your backend URL

// Start system
export const startSystem = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/start`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

// Stop system
export const stopSystem = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/stop`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

// Configure tickets
export const configureTickets = async (data) => {
    try {
        console.log("Sending request to backend:", data);
        const response = await axios.post(`${API_BASE_URL}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("Backend response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in request:", error);
        throw error.response ? error.response.data : new Error("Network error");
    }
};
