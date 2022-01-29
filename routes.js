const fs= require("fs")

const routesHandler = (req,res) => {
    const url = req.url
    const method=req.method

    if (url === "/") {
        res.setHeader("Content-Type", "text/html")
        res.write("<html>")
        res.write("<head><title>Enter message</title></head>")
        res.write("<body><form action='/message' method='POST'><input name='message' type='text'/><button type='submit'>send</button</form></body>")
        res.write("</html")
        return res.end()
    }
    if (url === "/message" && method === "POST") {
        const body = [];  
        req.on("data", (chunk) => {
            body.push(chunk)
            console.log(chunk)
        })
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
            const message= parsedBody.split("=")[1]
            fs.writeFile("message.txt", message, (err) => {
                res.statusCode = 302;
                res.setHeader("Location", "/")
                res.end()
            })
        })
        // res.writeHead(302,{})
    }
    res.setHeader("Content-Type", "text/html")
    res.write("<html>")
    res.write("<head><title>my first page</title></head>")
    res.write("<body><h1>hello world from node server</h1></body>")
    res.write("</html")
    res.end()
}


module.exports = routesHandler;