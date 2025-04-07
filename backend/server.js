require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mysql = require("mysql")

const app = express()
const port = process.env.PORT
const mysql_connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

mysql_connection.connect()

app.use(cors())
app.use(express.text())

let getCount = 0
app.get("/get/chat", (req, res) => {
    console.log(getCount)
    getCount++
    try {
        mysql_connection.query("select * from chat", (err, rows, fields) => {
            if (err) throw err
            res.status(200).json(rows)
        })
    } catch (err) {
        res.status(400).send("Request failed")
    }
})

app.post("/post/new", (req, res) => {
    const message = req.body
    const sender = req.get("origin")
    // console.log("New Message:", message)
    // console.log("Host:", req.get("host"))
    // console.log("Origin:", req.get("origin"))
    try {
        mysql_connection.query(`insert into chat (sender, message) values (?, ?)`, [sender, message], (err, results, fields) => {
            if (err) throw err
            // console.log(results)
        })
        res.status(200).send("Request success")
    } catch (err) {
        res.status(400).send("Request failed")
    }
})

app.all("/", (req, res) => {
    res.end("Bad Gateway")
})

let ctrlCount = 0
process.on("SIGINT", () => {
    if (ctrlCount == 0) {
        console.log("Entered Exit Mode")
        console.log("Press 'y' or 'n' to exit or stay")
        console.log("Press CTRL+C again to exit")
    }

    ctrlCount += 1
    if (ctrlCount > 1) {
        console.log("Disconnecting db")
        console.log("Exiting")
        mysql_connection.end()
        process.exit(0)
    }

    process.stdin.setEncoding("utf8")
    process.stdin.once("data", (data) => {
        const key = data.trim().toLowerCase()
        if (key === "y" || key === "yes") {
            console.log("Disconnecting db")
            console.log("Exiting")
            mysql_connection.end()
            process.exit(0)
        }
        else {
            console.log("Exiting Exit Mode")
            ctrlCount = 0
        }
    })
})

/* 
 * Correct stopping procedure, if started by "npm start":
 * 1. CTRL+C
 * 2. Y or y
 * 3. CTRL+C
*/
app.listen(port, () => {
    console.log(`Started on port ${port}`)
})