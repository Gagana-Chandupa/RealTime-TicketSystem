import React, { useState } from "react";

const TicketForm = ({ addLog, handleConfigure, handleGetConfig }) => {
  const [Totaltickets, setTotaltickets] = useState("");
  const [ReleaseRate, setReleaseRate] = useState("");
  const [RetrievalRate, setRetrievalRate] = useState("");
  const [Maximumtickets, setMaximumtickets] = useState("");

  const handleNonNegativeChange = (setter) => (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) >= 0) {
      setter(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const configData = {
      totalTickets: Totaltickets,
      releaseRate: ReleaseRate,
      retrievalRate: RetrievalRate,
      maximumTickets: Maximumtickets,
    };

    addLog("Submitting ticket configuration...");
    handleConfigure(configData); 
    setTotaltickets("");
    setReleaseRate("");
    setRetrievalRate("");
    setMaximumtickets("");
  };

  return (
    <form className="w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Total tickets:</label>
          <input
            type="number"
            value={Totaltickets}
            onChange={handleNonNegativeChange(setTotaltickets)}
            placeholder="Enter total tickets"
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Ticket Release rate:</label>
          <input
            type="number"
            value={ReleaseRate}
            onChange={handleNonNegativeChange(setReleaseRate)}
            placeholder="Enter Release rate"
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Ticket Retrieval rate:</label>
          <input
            type="number"
            value={RetrievalRate}
            onChange={handleNonNegativeChange(setRetrievalRate)}
            placeholder="Enter Retrieval rate"
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Maximum tickets:</label>
          <input
            type="number"
            value={Maximumtickets}
            onChange={handleNonNegativeChange(setMaximumtickets)}
            placeholder="Enter Maximum no of tickets"
            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
        >
          Configure
        </button>
        <button
          type="button"
          onClick={{handleGetConfig}}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
        >
          GET
        </button>

      </div>
    </form>
  );
};

export default TicketForm;
