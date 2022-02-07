// const http = require("http"); 


const express = require("express")

const path = require("path")
const routPath= require("./utils/path")

const adminData = require("./routes/admin")
const shopRoutes= require("./routes/shop")

const app = express();



app.set("view engine", "pug")
app.set("views", "views") //tells express the directory of templating engine

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname,"public")))
app.use("/admin",adminData.Router)
app.use("/shop",shopRoutes)


app.use((req,res , next) => {
    res.status(404).sendFile(path.join(routPath,"views","not-found.html")) 
})

app.listen(8000, () => {
    console.log("listening on port 8000")
})