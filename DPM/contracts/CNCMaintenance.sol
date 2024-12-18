// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CNCMaintenance {
    struct Prediction {
        uint256 id;
        string machineId;
        bool maintenanceNeeded;
        uint256 timestamp;
    }

    Prediction[] public predictions;

    event PredictionLogged(uint256 id, string machineId, bool maintenanceNeeded, uint256 timestamp);

    function logPrediction(string memory _machineId, bool _maintenanceNeeded) public {
        uint256 predictionId = predictions.length;
        predictions.push(Prediction(predictionId, _machineId, _maintenanceNeeded, block.timestamp));
        emit PredictionLogged(predictionId, _machineId, _maintenanceNeeded, block.timestamp);
    }

    function getPredictionById(uint256 _id) public view returns (string memory, bool, uint256) {
        require(_id < predictions.length, "Prediction does not exist");
        Prediction memory prediction = predictions[_id];
        return (prediction.machineId, prediction.maintenanceNeeded, prediction.timestamp);
    }

    function getPredictionCount() public view returns (uint256) {
        return predictions.length;
    }
}
