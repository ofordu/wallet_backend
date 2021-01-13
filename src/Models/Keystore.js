const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const keystoreSchema = new Schema(
  {
    walletAddress: { type: String, required: true },
    json: {
      type: String,
    },
  },
  { timestamps: true }
);
const Keystore = mongoose.model("keystore", keystoreSchema);
module.exports = Keystore;
