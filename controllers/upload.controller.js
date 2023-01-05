const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");

const pipeline = promisify(require("stream").pipeline);
//const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      !req.file.mimetype == "image/jpg" ||
      !req.file.mimetype == "image/png" ||
      !req.file.mimetype == "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 2818128) throw Error("max size");
  } catch (err) {
    return res.status(201).json({ err });
  }
  const fileName = req.body.name + ".jpg";
  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/profil/" + fileName } },
      {
        new: true,
        useFindAndModify: false,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    if (updatedUser) {
      res.send(updatedUser);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating user" });
  }
  console.log("alo");
};
