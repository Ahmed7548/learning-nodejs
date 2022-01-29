const http = require("http"); 

const express = require("express")

const app = express();
 
app.use((req,res,next) => {
    console.log("in the middleWare")
    next()// allows the request to continue to the next middleware
})
app.use((req,res,next) => {
    console.log("in the 2nd middleWare")
    next()
})

const server=http.createServer(app);
server.listen(8000)