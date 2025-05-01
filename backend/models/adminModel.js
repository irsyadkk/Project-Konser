import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Admin = db.define('admin',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama: DataTypes.STRING,
    pass: DataTypes.STRING
},{
    freezeTableName:true
});

export default Admin;

(async() =>{
    await db.sync();
})();