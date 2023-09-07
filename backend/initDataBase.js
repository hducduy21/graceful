const db = require('./src/utils/db')
const {initDatabase} = require("./initData")
db.Connect();
initDatabase();