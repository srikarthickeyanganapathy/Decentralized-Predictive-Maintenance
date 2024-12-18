const mongoose = require("mongoose");
const { machine } = require("os");
const CNCmodel = new mongoose.Schema({
        MachineID: String,
        TransactionHash : String,
        Blockno: Number,
        UnixTimestamp: Number,
        DateTime: String,
        From: String,
        To: String,
        TxnFee: Number
})

module.exports = mongoose.model("cncs", CNCmodel);