import React, { useState } from "react";
import axios from "axios";

const Web = () => {
  const [machineId, setMachineId] = useState("");
  const [vibration, setVibration] = useState("");
  const [temperature, setTemperature] = useState("");
  const [load, setLoad] = useState("");
  const [message, setMessage] = useState("");

  const predictAndLog = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v3/predictAndLog", {
        machineId,
        features: { temperature, vibration, load },
      });
      setMessage("Prediction logged successfully: " + response.data.transactionHash);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div>
      <h3>CNC Maintenance Prediction</h3>
      <div>
        <input
          type="text"
          placeholder="Machine ID"
          value={machineId}
          onChange={(e) => setMachineId(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Vibration"
          value={vibration}
          onChange={(e) => setVibration(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Temperature"
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Load"
          value={load}
          onChange={(e) => setLoad(Number(e.target.value))}
        />
      </div>
      <div>
        <button onClick={predictAndLog}>Predict and Log</button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Web;