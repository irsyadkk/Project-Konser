import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Konser = db.define('konser',{
    nama: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    bintangtamu: DataTypes.STRING
},{
    freezeTableName:true
});

export default Konser;

(async() =>{
    await db.sync();
})();