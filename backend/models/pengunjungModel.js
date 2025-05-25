import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Pengunjung = db.define(
  "pengunjung",
  {
    nama: Sequelize.STRING,
    umur: Sequelize.STRING,
    email: Sequelize.STRING,
    tiket: Sequelize.STRING,
    refresh_token: Sequelize.TEXT,
  },
  {
    freezeTableName: true,
  }
);

db.sync().then(() => console.log("Database synced"));

export default Pengunjung;
