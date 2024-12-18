// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CNCMaintenanceModule", (m) => {
  // Deploy the CNCMaintenance contract
  const cncMaintenance = m.contract("CNCMaintenance", []);

  // Return the deployed contract
  return { cncMaintenance };
});
