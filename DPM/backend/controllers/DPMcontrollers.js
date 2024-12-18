require("dotenv").config();
const {Web3} = require("web3");
const axios = require("axios");
const CNC = require('../models/DPMmodel')
// Connect to Ethereum network
const web3 = new Web3(process.env.INFURA_SEPOLIA_URL);

const FLASK_API_URL = "https://decentralized-predictive-maintenance-1.onrender.com";
console.log(FLASK_API_URL);
const contractData = require("../contract.json");
const { error } = require("console");
const contract = new web3.eth.Contract(contractData.abi, contractData.contractAddress);

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;

const getAllData = async (req,res) => {
    const data = await CNC.find();
    try {
        if(!data){
            res.json({message:"there is no data"})
        }
        else{
            res.json({data: data});
        }
    } catch(err) {
        res.json({error: err});
    }
}

const LogPrediction = async (req, res) => {
    const { machineId, features } = req.body;
  
    try {
      // Call Flask API for prediction
      const flaskResponse = await axios.post(FLASK_API_URL, { features });
      const prediction = flaskResponse.data.prediction;
  
      // Encode the contract method call
      const data = contract.methods.logPrediction(machineId, prediction).encodeABI();
  
      // Get the latest gas parameters dynamically
      const gasEstimate = await contract.methods
        .logPrediction(machineId, prediction)
        .estimateGas({ from: ACCOUNT_ADDRESS });
      const gasPrice = await web3.eth.getGasPrice();
    //   const block = await web3.eth.getBlock("latest");
      
      // EIP-1559 gas parameters
      const maxPriorityFeePerGas = web3.utils.toWei("2", "gwei");
      const maxFeePerGas = parseInt(gasPrice) + parseInt(maxPriorityFeePerGas);
  
      // Prepare transaction
      const tx = {
        to: contractData.contractAddress,
        data,
        gas: gasEstimate,
        maxPriorityFeePerGas,
        maxFeePerGas,
        from: ACCOUNT_ADDRESS,
      };
  
      // Sign transaction using the private key
      const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  
      // Send signed transaction
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      const block = await web3.eth.getBlock(receipt.blockNumber);

      const gasUsed = parseInt(receipt.gasUsed);
      const gasFee = gasUsed * parseInt(gasPrice);
      const txnFee = web3.utils.fromWei(gasFee.toString(), "ether");
      
      const dpmmod = await new CNC({
        MachineID: machineId,
        TransactionHash: receipt.transactionHash,
        Blockno: parseInt(receipt.blockNumber),
        UnixTimestamp: parseInt(block.timestamp),
        DateTime: new Date(parseInt(block.timestamp) * 1000).toLocaleString(),
        From: ACCOUNT_ADDRESS,
        To: contractData.contractAddress,
        TxnFee: txnFee
      })
      await dpmmod.save();

      res.json({
        message: "Prediction logged successfully",
        transactionHash: receipt.transactionHash,
        data: dpmmod
      });
    } catch (error) {
      console.error("Error in predictAndLog:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  
  module.exports = {LogPrediction, getAllData};