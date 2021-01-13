const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const privateKeySchema = new Schema(
  {
    walletAddress: { type: String, required: true },
    privateKey: { type: String, required: true },
  },
  { timestamps: true }
);
const PrivateKey = mongoose.model("privateKey", privateKeySchema);
module.exports = PrivateKey;
