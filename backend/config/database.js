import { Sequelize } from "sequelize";

const db = new Sequelize('project_konser','root','', {
    host: '34.50.85.193',
    dialect: 'mysql'
});

export default db;