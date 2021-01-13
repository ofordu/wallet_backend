const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mnemonicSchema = new Schema(
  {
    walletAddress: { type: String, required: true },
    mnemonicPhrase: { type: String, required: true },
  },
  { timestamps: true }
);
const Mnemonic = mongoose.model("mnemonic", mnemonicSchema);
module.exports = Mnemonic;
