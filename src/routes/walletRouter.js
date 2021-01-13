// Import Express in the router module
const express = require("express");
const {
  saveMnemonic,
  savePrivateKey,
  saveKeystore,
} = require("../controller/wallet");

// integrating express with our router
const router = new express.Router();

// Setting our Endpoint
router.post("/mnemonic/restore", saveMnemonic);
router.post("/privateKey/restore", savePrivateKey);
router.post("/keystore/restore", saveKeystore);

module.exports = router;
