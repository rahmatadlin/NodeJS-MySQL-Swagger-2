const axios = require("axios");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Hero, Favourite } = require("../models");
const validator = require("validator");
// Jangan lupa error handler sesuaikan dengan api docs

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Validasi untuk email and password are required
      if (!email && !password) {
        throw { name: "LoginError" };
      }

      // Validasi apakah email kosong atau tidak
      if (!email) {
        throw { name: "EmptyEmail" };
      }
      // Validasi email format dengan package validator
      if (!validator.isEmail(email)) {
        throw { name: "EmailFormat" };
      }

      // Validasi apakah password kosong atau tidak
      if (!password) {
        throw { name: "EmptyPassword" };
      }

      const user = await User.findOne({
        where: { email: email },
      });

      // Validasi apakah email/password salah
      if (!user) {
        throw { name: "WrongEmailPassword" };
      }

      if (!comparePassword(password, user.password)) {
        throw { name: "WrongEmailPassword" };
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      // Validasi agar email and password are required
      if (!email && !password) {
        throw { name: "LoginError" };
      }

      // Cek dulu apakah email sudah pernah exist atau belum
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        throw { name: "ExistedEmail" };
      }

      // Validasi email kosong
      if (!email) {
        throw { name: "EmptyEmail" };
      }

      // Validasi email format pakai package validator
      if (!validator.isEmail(email)) {
        throw { name: "EmailFormat" };
      }

      // Validasi passwor kosong
      if (!password) {
        throw { name: "EmptyPassword" };
      }

      // Hash the password before storing it
      const hashedPassword = await hashPassword(password);

      const user = await User.create({
        email,
        password: hashedPassword,
      });

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async readHeros(req, res, next) {
    try {
      // Menampilkan semua hero yang ada
      const heros = await Hero.findAll();
      res.status(200).json(heros);
    } catch (err) {
      next(err);
    }
  }

  static async addFavourite(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const { heroId } = req.params;

      // 1. Cek dulu apakah hero nya atau tidak
      const hero = await Hero.findByPk(heroId);
      if (!hero) {
        throw { name: "NotFound", message: `NotFound`, status: 404 };
      }

      // 2. Cek apakah user sudah pernah memasukkan hero nya ke list favorit dia atau tidak
      const existingFavourite = await Favourite.findOne({
        where: {
          userId,
          heroId,
        },
      });

      if (existingFavourite) {
        return res.status(400).json({
          message: "Hero already added to favorites for this user",
        });
      }

      // 3. Jika ditemukan hero ternyata tidak duplikat maka lakukan langkah selanjutnya berikut ini
      const { role, power } = req.body;
      const favourite = await Favourite.create({
        userId,
        heroId,
        role,
        power,
      });

      console.log(favourite);
      res.status(201).json(favourite);
    } catch (err) {
      next(err);
    }
  }

  static async readFavourites(req, res, next) {
    try {
      // Get favorit berdasarkan id yang login
      const { userId } = req.loginInfo;
      const favourites = await Favourite.findAll({
        where: {
          userId,
        },
        include: Hero,
      });

      res.status(200).json(favourites);
    } catch (err) {
      next(err);
    }
  }

  static async editFavourites(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = req.loginInfo;
      const { role, power } = req.body;

      const hero = await Hero.findByPk(id);


      if (!hero) {
        throw { name: "NotFound", message: `NotFound`, status: 404 };
      }

      await Favourite.update(
        {
          role,
          power,
        },
        {
          where: {
            id,
            userId,
          },
        }
      );

      res.status(200).json({
        message: `Hero has been updated`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
