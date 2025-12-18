import db from 'mysql2'
import 'dotenv/config'

let connection;

try {
    connection = db.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect((err) => {
        if(err){
            console.log("Database connection failed")
        }else{
            console.log("Database connected")
        }
    })

}catch(err){
    console.log(err)
}

export default connection;