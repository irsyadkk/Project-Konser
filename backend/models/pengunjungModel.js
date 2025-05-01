import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Pengunjung = db.define('pengunjung',{
    nama: DataTypes.STRING,
    umur: DataTypes.STRING,
    email: DataTypes.STRING
},{
    freezeTableName:true
});

export default Pengunjung;

(async() =>{
    await db.sync();
})();