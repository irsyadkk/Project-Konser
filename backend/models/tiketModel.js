import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Tiket = db.define('tiket',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    quota: DataTypes.INTEGER
},{
    freezeTableName:true
});

export default Tiket;

(async() =>{
    await db.sync();
})();