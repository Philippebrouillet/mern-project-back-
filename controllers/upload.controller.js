const UserModel = require("../models/user.model");

console.log();

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

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/profil/" + fileName } },
      {
        new: true,
        useFindAndModify: false,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
