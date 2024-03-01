const { Favourite } = require("../models");

async function authorization(req, res, next) {
  try {
    const { id } = req.params;
    const { userId } = req.loginInfo;

    const favourite = await Favourite.findByPk(id);

    if (!favourite) {
      return res.status(404).json({ message: "Hero not found" });
    }

    // Periksa apakah user yang mencoba mengedit adalah pemilik favorit
    if (favourite.userId !== userId) {
      return res.status(403).json({
        message:
          "You are not authorized",
      });
    }

    // Kemudian dilanjutkan ke fungsi controller jika otorisasi berhasil
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authorization;
