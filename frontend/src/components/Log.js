import React from "react";

const Log = ({ logs }) => (
  <div className="log-container">
    <h3>System Logs</h3>
    <ul className="log-list">
      {logs.map((log, index) => (
        <li key={index} className="log-item">{log}</li>
      ))}
    </ul>
  </div>
);

export default Log;
